/* eslint-disable no-underscore-dangle */

/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable max-lines-per-function */

/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable no-var */

/* eslint-disable vars-on-top */

/* eslint-disable no-global-assign */

/* eslint-disable @typescript-eslint/explicit-function-return-type */

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import 'jest-localstorage-mock';

import { Storage } from '@/core';

describe('Storage', () => {
  let storage: Storage;

  beforeEach(() => {
    // Создаем новый экземпляр Storage перед каждым тестом
    storage = new Storage();
  });

  afterEach(() => {
    // Очищаем localStorage после каждого теста
    localStorage.clear();
  });

  it('should set and get item correctly', () => {
    const key = 'testKey';
    const value = { name: 'testValue' };

    // Устанавливаем значение в localStorage
    storage.setItem(key, value);

    // Получаем значение из localStorage
    const retrievedValue = storage.getItem(key);

    // Проверяем, что полученное значение соответствует установленному значению
    expect(retrievedValue).toEqual(value);
  });

  it('should remove item correctly', () => {
    const key = 'testKey';
    const value = { name: 'testValue' };

    // Устанавливаем значение в localStorage
    storage.setItem(key, value);

    // Удаляем значение из localStorage
    storage.removeItem(key);

    // Получаем значение из localStorage
    const retrievedValue = storage.getItem(key);

    // Проверяем, что полученное значение равно null после удаления
    expect(retrievedValue).toBeNull();
  });

  it('should clear storage correctly', () => {
    const key1 = 'testKey1';
    const key2 = 'testKey2';
    const value1 = { name: 'testValue1' };
    const value2 = { name: 'testValue2' };

    // Устанавливаем значения в localStorage
    storage.setItem(key1, value1);
    storage.setItem(key2, value2);

    // Очищаем localStorage
    storage.clear();

    // Получаем значения из localStorage
    const retrievedValue1 = storage.getItem(key1);
    const retrievedValue2 = storage.getItem(key2);

    // Проверяем, что полученные значения равны null после очистки
    expect(retrievedValue1).toBeNull();
    expect(retrievedValue2).toBeNull();
  });
});
