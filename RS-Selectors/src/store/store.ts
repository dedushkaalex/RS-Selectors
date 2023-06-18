import { BaseComponent } from '@/core';

/* eslint-disable no-underscore-dangle */
// будем следить за уровнем
class Store {
  protected observers: BaseComponent[];
  constructor() {
    this.observers = [];
  }
}

export const store = new Store();
