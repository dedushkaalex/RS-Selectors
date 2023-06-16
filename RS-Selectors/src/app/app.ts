import { BaseComponent } from '@/core';

import { HTMLViewer } from '@/components/html-viewer/HTMLViewer';

import { Table } from '@/components';
import { Header } from '@/layout';

export class App extends BaseComponent {
  public table: BaseComponent;
  public viewer: BaseComponent;

  private leftCol;
  private rightCol;
  constructor() {
    super({
      tagName: 'div',
      classList: ['main']
    });
    this.table = new Table();
    this.viewer = new HTMLViewer();

    this.leftCol = new BaseComponent({
      tagName: 'div',
      classList: ['left-col'],
      children: [new Header()]
    });
    this.rightCol = new BaseComponent({
      tagName: 'div',
      classList: ['right-col']
    });
    this.node.append(this.leftCol.node);
    this.node.append(this.rightCol.node);
  }
}
