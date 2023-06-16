/* eslint-disable no-underscore-dangle */
class Store {
  public _plates: Array<string> = ['tarelka', 'lozhka', 'lusyia', 'tasha'];
  public _fruits: Array<string> = ['vitalikBoss'];
  public _selectors: Array<string> = ['.menu'];

  get plates(): Array<string> {
    return this._plates;
  }

  set plates(item: string) {
    this._plates.push(item);
  }

  get selectors(): Array<string> {
    return this._selectors;
  }

  set selectors(item: string) {
    this._selectors.push(item);
  }
}

export const store = new Store();
