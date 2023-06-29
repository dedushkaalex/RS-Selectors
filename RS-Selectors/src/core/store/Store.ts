import { BaseComponent } from '../base-component';
import { Storage } from '../storage';

import { CURRENT_LEVEL } from '@/constants/gameConstants';

type State = {
  level: number;
};

type Observer = {
  update(): void;
};

export class Store {
  private static instance: Store;

  private observers: Observer[] = [];

  public storageService: Storage;
  public state;

  constructor(initialState: State) {
    this.storageService = new Storage();
    const savedLevel = this.storageService.getItem<number>(CURRENT_LEVEL);

    const state = savedLevel ? { level: savedLevel } : initialState;

    this.state = new Proxy(state, {
      set: (
        target: typeof state,
        property: keyof typeof state,
        value
      ): boolean => {
        target[property] = value;
        console.log(this.state.level, 's');

        this.notifyAll();
        return true;
      }
    });
  }

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store({
        level: 0
      });
    }

    return Store.instance;
  }

  private notifyAll(): void {
    this.observers.forEach((o) => o.update());
  }

  public updateLevel(currentLevel: number): void {
    this.state.level = currentLevel;
    console.log(this.state);
  }

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }
  public removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
}

// /* eslint-disable no-underscore-dangle */
// export const store = {
//   _currentLevelGame: 0,
//   set currentLevelGame(value: number) {
//     this._currentLevelGame = value;
//     console.log(this._currentLevelGame);
//   },

//   get currentLevelGame(): number {
//     return this._currentLevelGame;
//   }
// };