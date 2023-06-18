import { BaseComponent } from '@/core';

import { Editor } from '@/components/html-editor/Editor';
import { HTMLViewer } from '@/components/html-viewer/HTMLViewer';

import { Table } from '@/components';
import { Header } from '@/layout';

export class App extends BaseComponent {
  public table = new Table();
  public viewer = new HTMLViewer();
  public editor = new Editor();

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
  }
}
