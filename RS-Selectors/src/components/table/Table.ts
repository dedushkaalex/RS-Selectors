import {
  BaseComponent,
  PropsCreateDOMElements,
  createDOMElements,
  levels,
  storage
} from '@/core';

import { GAME_CONFIG } from '@/config/tableTemplateConfig';

import styles from './Table.module.scss';

import { table, tableEdge, tableWrapper } from './ui/TableUi';
import { CURRENT_LEVEL } from '@/constants/gameConstants';

const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

export class Table extends BaseComponent {
  private table = table;
  private configLevel: PropsCreateDOMElements[][] = GAME_CONFIG;

  constructor() {
    super({
      tagName: 'div',
      classList: [styles['game-wrapper']],
      children: [tableWrapper, tableEdge]
    });

    this.render();
  }

  private render(): void {
    const currentLevel = Number(storage.getItem(CURRENT_LEVEL));

    const gameElements = createDOMElements(this.configLevel[currentLevel]);

    gameElements.forEach((item, index) => {
      this.mouseEventHandlers(item, index);
      this.eventListenerHandlers(item, index);
      this.table.node.append(item);
    });
  }

  private eventListenerHandlers(elem: HTMLElement, index: number): void {
    document.addEventListener(`hoverByViewer-${index}`, () => {
      console.log('element');
      elem.classList.add('hovered');
    });

    document.addEventListener(`cancelHoverByViewer-${index}`, () => {
      console.log('element');
      elem.classList.remove('hovered');
    });
  }

  private mouseEventHandlers(elem: HTMLElement, index: number): void {
    elem.onmouseover = (): void => {
      if (!elem) throw new Error('');
      elem.classList.add('hovered');
      document.dispatchEvent(new CustomEvent(`hoverByTable-${index}`));
    };

    elem.onmouseleave = (): void => {
      if (!elem) throw new Error('');
      elem.classList.remove('hovered');
      document.dispatchEvent(new CustomEvent(`cancelHoverByTable-${index}`));
    };
  }
}
