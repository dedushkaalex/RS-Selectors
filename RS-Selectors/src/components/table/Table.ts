import { BaseComponent, levels, storage } from '@/core';

import {
  GAME_CONFIG,
  PropsCreateDOMElements
} from '@/config/tableTemplateConfig';

import styles from './Table.module.scss';

import { helper, table, tableEdge, tableWrapper } from './ui/TableUi';
import { CURRENT_LEVEL, SELECTOR } from '@/constants/gameConstants';

const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

export class Table extends BaseComponent {
  private table = table;
  private helper = helper;
  private configLevel: PropsCreateDOMElements[][] = GAME_CONFIG;
  private counter = 0;

  public gameSelectors: HTMLElement[] = [];
  constructor() {
    super({
      tagName: 'div',
      classList: [styles['game-wrapper']],
      children: [helper, tableWrapper, tableEdge]
    });

    this.render();
    document.addEventListener('isWin', () => {
      this.clear(this.table);
      this.render();
    });
  }

  private createDOMElements<T extends PropsCreateDOMElements>(
    config: Array<T>
  ): Array<HTMLElement> {
    const elements: Array<HTMLElement> = [];

    for (let i = 0; i < config.length; i += 1) {
      const {
        tagName,
        className,
        children,
        isGameTarget
      }: PropsCreateDOMElements = config[i];
      const element = document.createElement(tagName);
      element.id = `${this.counter}`;
      if (isGameTarget) {
        element.classList.add('gameTarget');
        storage.setItem(SELECTOR, isGameTarget);
        this.gameSelectors.push(element);
      }

      this.bindMouseEvent(element, this.counter, `<${tagName}><${tagName}/>`);
      this.bindEventListener(
        element,
        this.counter,
        `<${tagName}><${tagName}/>`
      );

      this.counter += 1;

      if (className && className.length > 0) {
        element.classList.add(...className);
      }

      if (children && children.length > 0) {
        const childElements = this.createDOMElements(children);
        childElements.forEach((childElement, index) => {
          element.appendChild(childElement);
          if (i % 2 !== 0) {
            childElement.style.rotate = '20deg';
            childElement.style.transform = 'translateY(-1rem)';
          }
          if (i % 2 === 0) {
            childElement.style.rotate = '-40deg';
            childElement.style.transform = 'translateY(-1rem)';
          }
        });
      }

      elements.push(element);
    }

    return elements;
  }

  private render(): void {
    const currentLevel = Number(storage.getItem(CURRENT_LEVEL)) || 0;

    const gameElements = this.createDOMElements(this.configLevel[currentLevel]);
    console.log(gameElements);

    const { node } = this.table;

    gameElements.forEach((item, index) => {
      node.append(item);
    });
  }

  private bindEventListener(
    elem: HTMLElement,
    index: number,
    textContent: string
  ): void {
    document.addEventListener(`hoverByViewer-${index}`, (e) => {
      const { x } = elem.getBoundingClientRect();
      const { node } = this.helper;
      elem.classList.add('hovered');
      this.helper.addClass('show');
      this.helper.addTextContent(textContent);
      node.style.left = `${x}px`;
      node.style.transform = `translateX(-50%)`;
    });

    document.addEventListener(`cancelHoverByViewer-${index}`, () => {
      console.log('element');
      elem.classList.remove('hovered');
      this.helper.removeClass('show');
    });
  }

  private bindMouseEvent(
    elem: HTMLElement,
    index: number,
    textContent: string
  ): void {
    const { node } = this.helper;
    elem.onmouseover = (e): void => {
      e.stopPropagation();
      const { x } = elem.getBoundingClientRect();
      if (!elem) throw new Error('');
      elem.classList.add('hovered');
      this.helper.addClass('show');
      this.helper.addTextContent(textContent);
      node.style.left = `${x}px`;
      node.style.transform = `translateX(-50%)`;

      document.dispatchEvent(new CustomEvent(`hoverByTable-${index}`));
    };

    elem.onmouseout = (e): void => {
      if (!elem) throw new Error('');
      elem.classList.remove('hovered');
      this.helper.removeClass('show');
      document.dispatchEvent(new CustomEvent(`cancelHoverByTable-${index}`));
    };
  }
}
