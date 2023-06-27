import { BaseComponent, storage } from '@/core';
import { createDOMElements } from '@/core/render-table-elements/renderTableElements';

import { Editor } from '@/components/html-editor/Editor';
import { HTMLViewer } from '@/components/html-viewer/HTMLViewer';
import { LevelList } from '@/components/level-list/LevelList';

import {
  GAME_CONFIG,
  PropsCreateDOMElements
} from '@/config/tableTemplateConfig';

import { setAnimation } from '@/utils/setAnimation';

import { Table } from '@/components';
import { CURRENT_LEVEL, PROGRESS, SELECTOR } from '@/constants/gameConstants';
import { Header } from '@/layout';
import { ProgressItem } from '@/types/types';
import { helpButton } from '@/ui/help-button/HelpButton';
import { resetButton } from '@/ui/reset-button/ResetButton';

export class App extends BaseComponent {
  public table = new Table();
  public viewer = new HTMLViewer();
  public editor = new Editor();
  public levelList = new LevelList();
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
      children: [new Header(), this.table, helpButton, this.viewerWrapper]
    });
    this.rightCol = new BaseComponent({
      tagName: 'div',
      classList: ['right-col'],
      children: [this.levelList, resetButton]
    });
    this.node.append(this.leftCol.node);
    this.node.append(this.rightCol.node);
    this.bindEditorEventListener();
    this.clearProgressEventListener();
  }

  private bindEditorEventListener(): void {
    document.addEventListener('sendResultAnswer', (e) => {
      const target = e as CustomEvent;

      const selectorInputValue = target.detail.value;
      const isHelpBtn = target.detail.isHelp;
      const selectorStorageValue = storage.getItem(SELECTOR);
      if (selectorInputValue === selectorStorageValue) {
        console.log('You won');
        let progress: ProgressItem[] = storage.getItem(PROGRESS);
        if (!progress) progress = [];
        console.log(progress);
        progress.push({
          correct: true,
          isHelp: isHelpBtn,
          lvl: Number(storage.getItem(CURRENT_LEVEL))
        });
        storage.setItem(PROGRESS, progress);
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
          setAnimation('clean', item);
        });

        setTimeout(() => this.isWinEvent(), 1000);
      } else {
        setAnimation('shake', this.viewerWrapper.node);
      }
    });
  }

  private isWinEvent(): void {
    document.dispatchEvent(new CustomEvent('isWin'));
  }

  private clearProgressEventListener(): void {
    document.addEventListener('reset', () => {
      storage.clear();
      this.table.reRender();
      this.viewer.reRender();
      this.levelList.reRender();
    });
  }
}
