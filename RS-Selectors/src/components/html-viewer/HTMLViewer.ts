import { BaseComponent } from '@/core';

import styles from './Viewer.module.scss';

export class HTMLViewer extends BaseComponent {
  constructor() {
    super({
      tagName: 'div',
      classList: [styles.html__viewer]
    });
    this.render();
  }

  private render(): void {
    const viewerHeader = new BaseComponent({
      tagName: 'div',
      classList: [styles.viewer__header]
    });
    viewerHeader.node.insertAdjacentHTML(
      'beforeend',
      '<span>HTML Viewer</span><span>table.html</span>'
    );
    this.node.append(viewerHeader.node);
    const lineNumbers = new BaseComponent({
      tagName: 'div',
      classList: [styles.line__numbers]
    });
    this.node.append(lineNumbers.node);
    for (let i = 0; i < 20; i += 1) {
      lineNumbers.node.innerHTML += `<span>${i + 1}</span>`;
    }
  }
}
