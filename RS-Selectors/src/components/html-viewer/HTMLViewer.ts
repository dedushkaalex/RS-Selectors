import { BaseComponent, PropsCreateDOMElements, levels, storage } from '@/core';

import { GAME_CONFIG } from '@/config/tableTemplateConfig';

import styles from './Viewer.module.scss';

import './paraiso-dark.min.css';
import { lineNumbers, markupObserversWrapper, viewerHeader } from './ui';
import { CURRENT_LEVEL } from '@/constants/gameConstants';

const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

export class HTMLViewer extends BaseComponent {
  private currentLevel = Number(storage.getItem(CURRENT_LEVEL)) || 0;
  private configLevel: PropsCreateDOMElements[][] = GAME_CONFIG;
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

    this.render();
  }

  private render(): void {
    const level = this.configLevel[this.currentLevel];

    level.forEach((item, index) => {
      const highLightElement = new BaseComponent({
        tagName: 'pre',
        classList: [],
        children: [
          new BaseComponent({
            tagName: 'code',
            textContent: `<${item.tagName}/>`
          })
        ]
      });

      const markupObserver = new BaseComponent({
        tagName: 'div',
        classList: ['markup_code'],
        children: [highLightElement]
      });

      markupObserversWrapper.append(markupObserver);
      hljs.highlightElement(highLightElement.node);

      this.mouseEventHandlers(markupObserver, index);
      this.eventListenerHandlers(markupObserver, index);
    });
  }

  private eventListenerHandlers(elem: BaseComponent, index: number): void {
    document.addEventListener(`hoverByTable-${index}`, () => {
      console.log('element');
      elem?.addClass('hover-viewer');
    });

    document.addEventListener(`cancelHoverByTable-${index}`, () => {
      console.log('element');
      elem?.removeClass('hover-viewer');
    });
  }

  private mouseEventHandlers(elem: BaseComponent, index: number): void {
    elem.node.onmouseover = (): void => {
      elem?.addClass('hover-viewer');
      document.dispatchEvent(new CustomEvent(`hoverByViewer-${index}`));
    };

    elem.node.onmouseleave = (): void => {
      elem?.removeClass('hover-viewer');
      document.dispatchEvent(new CustomEvent(`cancelHoverByViewer-${index}`));
    };
  }
}
