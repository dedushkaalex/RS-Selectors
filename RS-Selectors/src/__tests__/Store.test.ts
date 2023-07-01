/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable max-lines-per-function */

/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable no-var */

/* eslint-disable vars-on-top */

/* eslint-disable no-global-assign */

/* eslint-disable @typescript-eslint/explicit-function-return-type */

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Storage } from '@/core';
import { Store } from '@/core/store/Store';

// Создаем мок-объект для зависимости Storage
jest.mock('../core/storage/Storage.ts', () => {
  return {
    Storage: jest.fn().mockImplementation(() => {
      return {
        getItem: jest.fn()
      };
    })
  };
});

describe('Store', () => {
  let store: Store;
  let storageMock: jest.Mocked<Storage>;
  beforeEach(() => {
    store = new Store({ level: 0 });
    storageMock = new Storage() as jest.Mocked<Storage>;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the same instance', () => {
    const instance1 = Store.getInstance();
    const instance2 = Store.getInstance();

    expect(instance1).toBe(instance2);
  });
  it('should create a new instance of Store', () => {
    expect(store).toBeInstanceOf(Store);
  });

  it('should initialize state with saved level from storage', () => {
    const savedLevel = 5;
    store = new Store({ level: savedLevel });
    expect(store.state.level).toBe(savedLevel);
  });

  it('should update level and notify observers', () => {
    const observerMock = {
      update: jest.fn()
    };

    store.addObserver(observerMock);
    store.updateLevel(10);

    expect(store.state.level).toBe(10);
    expect(observerMock.update).toHaveBeenCalled();
  });

  it('should add and remove observers', () => {
    const observerMock1 = {
      update: jest.fn()
    };

    const observerMock2 = {
      update: jest.fn()
    };

    store.addObserver(observerMock1);
    store.addObserver(observerMock2);

    store.updateLevel(5);

    expect(observerMock1.update).toHaveBeenCalled();
    expect(observerMock2.update).toHaveBeenCalled();

    store.removeObserver(observerMock1);
    store.updateLevel(8);

    expect(observerMock1.update).toHaveBeenCalledTimes(1);
    expect(observerMock2.update).toHaveBeenCalledTimes(2);
  });
});
