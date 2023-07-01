/**
 * @jest-environment jsdom
 */

/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable max-lines-per-function */

/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable no-var */

/* eslint-disable vars-on-top */

/* eslint-disable no-global-assign */

/* eslint-disable @typescript-eslint/explicit-function-return-type */

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { BaseComponent } from '@/core';

describe('BaseComponent', () => {
  let component: BaseComponent;

  beforeEach(() => {
    // Создаем новый экземпляр BaseComponent перед каждым тестом
    component = new BaseComponent({ tagName: 'div' });
  });

  afterEach(() => {
    // Удаляем компонент после каждого теста
    component.destroy();
  });

  it('should create a div element', () => {
    // Проверяем, что node является HTMLDivElement
    expect(component.node).toBeInstanceOf(HTMLDivElement);
  });

  it('should add class to element', () => {
    const className = 'testClass';

    // Добавляем класс к элементу
    component.addClass(className);

    // Проверяем, что элемент имеет добавленный класс
    expect(component.node.classList.contains(className)).toBe(true);
  });

  it('should remove class from element', () => {
    const className = 'testClass';

    // Добавляем класс к элементу
    component.addClass(className);

    // Удаляем класс из элемента
    component.removeClass(className);

    // Проверяем, что элемент не имеет удаленного класса
    expect(component.node.classList.contains(className)).toBe(false);
  });

  it('should add text content to element', () => {
    const textContent = 'Hello, world!';

    // Добавляем текстовое содержимое к элементу
    component.addTextContent(textContent);

    // Проверяем, что элемент имеет добавленное текстовое содержимое
    expect(component.node.textContent).toBe(textContent);
  });

  it('should append child components', () => {
    const childComponent = new BaseComponent({ tagName: 'span' });

    // Добавляем дочерний компонент
    component.append(childComponent);

    // Проверяем, что дочерний компонент был добавлен к элементу
    expect(component.node.contains(childComponent.node)).toBe(true);
  });

  it('should clear element', () => {
    const textContent = 'Hello, world!';
    component.addTextContent(textContent);

    // Очищаем элемент
    component.clear(component);

    // Проверяем, что элемент не имеет текстового содержимого
    expect(component.node.textContent).toBe('');
  });
});
