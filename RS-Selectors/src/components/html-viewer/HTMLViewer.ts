/* eslint-disable max-lines-per-function */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable prefer-const */
import { BaseComponent, storage } from '@/core';

import {
  GAME_CONFIG,
  PropsCreateDOMElements
} from '@/config/tableTemplateConfig';

import styles from './Viewer.module.scss';

import './paraiso-dark.min.css';
import { lineNumbers, markupObserversWrapper, viewerHeader } from './ui';
import { CURRENT_LEVEL } from '@/constants/gameConstants';

const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

export class HTMLViewer extends BaseComponent {
  private currentLevel = Number(storage.getItem(CURRENT_LEVEL)) || 0;
  private configLevel: PropsCreateDOMElements[][] = GAME_CONFIG;
  private counter: number = 0;
  constructor() {
    super({
      tagName: 'div',
      classList: [styles.html__viewer],
      children: [
        viewerHeader,
        lineNumbers,
        new BaseComponent({
          tagName: 'div',
          classList: ['markup_text'],
          textContent: '<div class="table">'
        }),
        markupObserversWrapper,
        new BaseComponent({
          tagName: 'div',
          classList: ['markup_text', 'language-html'],
          textContent: '<div/>'
        })
      ]
    });
    // const level = this.configLevel[this.currentLevel];
    // this.createMarkupViewer(level, markupObserversWrapper);
    this.render();

    document.addEventListener('isWin', () => {
      this.reRender();
    });

    document.addEventListener('changelvl', () => {
      this.reRender();
    });
  }

  private render(): void {
    const currentLevel = Number(storage.getItem(CURRENT_LEVEL)) || 0;
    const level = this.configLevel[currentLevel];
    this.createMarkupViewer(level, markupObserversWrapper);
  }

  private reRender(): void {
    this.clear(markupObserversWrapper);
    this.render();
  }
  private createCodeHighlightWrapper(
    item: PropsCreateDOMElements,
    endTag: boolean = false
  ): HTMLElement {
    if (endTag) {
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = `<${item.tagName}/>`;
      pre.append(code);
      hljs.highlightElement(code);
      return pre;
    }
    let templateTextContent;
    if (item.children?.length && item.className.length) {
      templateTextContent = `<${item.tagName} class='${item.className}'>`;
    } else if (item.children?.length) {
      templateTextContent = `<${item.tagName}>`;
    } else {
      templateTextContent = `<${item.tagName}/>`;
    }
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = templateTextContent;
    pre.append(code);
    hljs.highlightElement(code);
    return pre;
  }
  private createElementObserver(): BaseComponent {
    const markupObserver = new BaseComponent({
      tagName: 'div',
      classList: ['markup_code']
    });
    markupObserver.node.style.paddingLeft = `${this.counter / 3}rem`;
    // TODO: ПОТОМ это удалить
    markupObserver.node.id = `${this.counter}`;
    this.bindMouseEvent(markupObserver, this.counter);
    this.bindEventListener(markupObserver, this.counter);
    this.counter += 1;
    return markupObserver;
  }
  public createMarkupViewer(
    level: PropsCreateDOMElements[],
    parent: BaseComponent
  ): void {
    level.forEach((item, index) => {
      const preElement = this.createCodeHighlightWrapper(item);
      const markupObserver = this.createElementObserver();
      markupObserver.node.append(preElement);
      parent.append(markupObserver);
      if (item.children && item.children.length > 0) {
        this.createMarkupViewer(item.children, markupObserver);
        const preElementEnd = this.createCodeHighlightWrapper(item, true);
        markupObserver.node.append(preElementEnd);
      }
    });
  }

  private bindEventListener(elem: BaseComponent, index: number): void {
    document.addEventListener(`hoverByTable-${index}`, (e) => {
      console.log('element');
      elem?.addClass('hover-viewer');
    });

    document.addEventListener(`cancelHoverByTable-${index}`, () => {
      console.log('element');
      elem?.removeClass('hover-viewer');
    });
  }

  private bindMouseEvent(elem: BaseComponent, index: number): void {
    elem.node.onmouseover = (e): void => {
      e.stopPropagation();
      elem?.addClass('hover-viewer');
      document.dispatchEvent(new CustomEvent(`hoverByViewer-${index}`));
    };

    elem.node.onmouseout = (): void => {
      elem?.removeClass('hover-viewer');
      document.dispatchEvent(new CustomEvent(`cancelHoverByViewer-${index}`));
    };
  }
}
