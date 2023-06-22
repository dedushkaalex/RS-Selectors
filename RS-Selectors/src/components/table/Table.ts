import {
  BaseComponent,
  PropsCreateDOMElements,
  createDOMElements,
  levels,
  storage
} from '@/core';

import { GAME_CONFIG } from '@/config/tableTemplateConfig';

import styles from './Table.module.scss';

import { helper, table, tableEdge, tableWrapper } from './ui/TableUi';
import { CURRENT_LEVEL } from '@/constants/gameConstants';

const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

export class Table extends BaseComponent {
  private table = table;
  private helper = helper;
  private configLevel: PropsCreateDOMElements[][] = GAME_CONFIG;

  constructor() {
    super({
      tagName: 'div',
      classList: [styles['game-wrapper']],
      children: [helper, tableWrapper, tableEdge]
    });

    this.render();
  }

  private render(): void {
    const currentLevel = Number(storage.getItem(CURRENT_LEVEL)) || 0;

    const gameElements = createDOMElements(this.configLevel[currentLevel]);
    console.log(gameElements);

    const { node } = this.table;

    gameElements.forEach((item, index) => {
      const tagName = `${this.configLevel[currentLevel][index].tagName}`;
      this.bindMouseEvent(item, +item.id, `<${tagName}><${tagName}/>`);
      this.bindEventListener(item, +item.id, `<${tagName}><${tagName}/>`);
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
    elem.onmouseover = (): void => {
      const { x } = elem.getBoundingClientRect();
      if (!elem) throw new Error('');
      elem.classList.add('hovered');
      this.helper.addClass('show');
      this.helper.addTextContent(textContent);
      node.style.left = `${x}px`;
      node.style.transform = `translateX(-50%)`;

      document.dispatchEvent(new CustomEvent(`hoverByTable-${index}`));
    };

    elem.onmouseleave = (): void => {
      if (!elem) throw new Error('');
      elem.classList.remove('hovered');
      this.helper.removeClass('show');
      document.dispatchEvent(new CustomEvent(`cancelHoverByTable-${index}`));
    };
  }
}
