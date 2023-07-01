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
import { createDOMElements } from '@/core';

describe('createDOMElements', () => {
  it('should create DOM elements with specified properties', () => {
    const config = [
      {
        tagName: 'div',
        className: ['test-class'],
        children: [
          {
            tagName: 'span',
            className: ['child-class']
          }
        ]
      }
    ];

    const elements = createDOMElements(config);

    // Проверяем, что был создан один элемент
    expect(elements.length).toBe(1);

    const element = elements[0];

    // Проверяем, что элемент имеет правильный тег
    expect(element.tagName).toBe('DIV');

    // Проверяем, что элемент имеет правильный класс
    expect(element.classList.contains('test-class')).toBe(true);

    // Проверяем, что элемент имеет дочерний элемент
    expect(element.children.length).toBe(1);

    const childElement = element.children[0];

    // Проверяем, что дочерний элемент имеет правильный тег
    expect(childElement.tagName).toBe('SPAN');

    // Проверяем, что дочерний элемент имеет правильный класс
    expect(childElement.classList.contains('child-class')).toBe(true);
  });
});
