import { BaseComponent, levels, storage } from '@/core';
import { createDOMElements } from '@/core/render-table-elements/renderTableElements';

import { Editor } from '@/components/html-editor/Editor';
import { HTMLViewer } from '@/components/html-viewer/HTMLViewer';

import { Table } from '@/components';
import { CURRENT_LEVEL } from '@/constants/gameConstants';
import { Header } from '@/layout';

export class App extends BaseComponent {
  public table = new Table();
  public viewer = new HTMLViewer();
  public editor = new Editor();

  public currentLevel =
    storage.getItem(CURRENT_LEVEL) || storage.setItem(CURRENT_LEVEL, 0);

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
      classList: ['right-col']
    });
    this.node.append(this.leftCol.node);
    this.node.append(this.rightCol.node);
    // window.onload = (): void => this.emit('levels', {});
    // console.log(...createDOMElements(LEVEL_1_ARR));
  }
}
