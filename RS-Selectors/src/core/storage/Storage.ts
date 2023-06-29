export class Storage {
  /**
   * Saves an item in localstorage with the provided key and value
   * @param {string} key - The key under which the value will be
   * @param {any} value - The value to be stored
   */
  public setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Removes an item from localstorage by the provided key
   * @param {string} key - The key of the item to be removed
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Retrieves an item from localstorage by the provided key
   * @param {string} key - The key of the item to be retrieved
   * @returns {any} - The value of the item, or null if the item is not found
   */
  public getItem<T>(key: string): T {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  /**
   * Clears all data from localstorage
   */
  public clear(): void {
    localStorage.clear();
  }
}

export const storage = new Storage();
