import { BaseComponent, storage } from '@/core';
import { createDOMElements } from '@/core/render-table-elements/renderTableElements';

import { Editor } from '@/components/html-editor/Editor';
import { HTMLViewer } from '@/components/html-viewer/HTMLViewer';
import { LevelList } from '@/components/level-list/LevelList';

import {
  GAME_CONFIG,
  PropsCreateDOMElements
} from '@/config/tableTemplateConfig';

import { Table } from '@/components';
import { CURRENT_LEVEL, SELECTOR } from '@/constants/gameConstants';
import { Header } from '@/layout';

export class App extends BaseComponent {
  public table = new Table();
  public viewer = new HTMLViewer();
  public editor = new Editor();
  public levelList = new LevelList();

  private currentLevel =
    storage.getItem(CURRENT_LEVEL) || storage.setItem(CURRENT_LEVEL, 0);
  private configLevel: PropsCreateDOMElements[][] = GAME_CONFIG;

  private leftCol;
  private rightCol;
  private viewerWrapper;
  constructor() {
    super({
      tagName: 'div',
      classList: ['main']
    });

    this.viewerWrapper = new BaseComponent({
      tagName: 'div',
      classList: ['html__wrapper'],
      children: [this.editor, this.viewer]
    });

    this.leftCol = new BaseComponent({
      tagName: 'div',
      classList: ['left-col'],
      children: [new Header(), this.table, this.viewerWrapper]
    });
    this.rightCol = new BaseComponent({
      tagName: 'div',
      classList: ['right-col'],
      children: [this.levelList]
    });
    this.node.append(this.leftCol.node);
    this.node.append(this.rightCol.node);
    this.bindEditorEventListener();
  }

  private bindEditorEventListener(): void {
    document.addEventListener('sendResultAnswer', (e) => {
      const target = e as CustomEvent;

      const selectorInputValue = target.detail.value;
      const selectorStorageValue = storage.getItem(SELECTOR);
      if (selectorInputValue === selectorStorageValue) {
        console.log('You won');
        if (
          Number(storage.getItem(CURRENT_LEVEL)) >=
          this.configLevel.length - 1
        ) {
          storage.setItem(CURRENT_LEVEL, this.configLevel.length - 1);
        } else {
          storage.setItem(
            CURRENT_LEVEL,
            Number(storage.getItem(CURRENT_LEVEL)) + 1
          );
        }
        this.table.gameSelectors.forEach((item) => {
          this.setAnimation('clean', item);
        });
        setTimeout(() => this.isWinEvent(), 1000);
      } else {
        this.setAnimation('shake', this.viewerWrapper.node);
      }
    });
  }

  private setAnimation<T extends HTMLElement>(
    className: string,
    element: T
  ): void {
    element.classList.add(className);
    // element.onanimationend = (): void => element.classList.remove(className);
  }

  private isWinEvent(): void {
    document.dispatchEvent(new CustomEvent('isWin'));
  }
}
