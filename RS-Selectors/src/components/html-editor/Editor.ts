import { BaseComponent, storage } from '@/core';

import { setAnimation } from '@/utils/setAnimation';

import styles from './Editor.module.scss';

import { EDITOR_TEXT } from './models';
import {
  createLineNumbers,
  editorHeader,
  enterButton,
  inputCodeHighlight,
  inputStrobe,
  inputWrapper
} from './ui';
import { SELECTOR } from '@/constants/gameConstants';

const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));

export class Editor extends BaseComponent {
  public enterButton = enterButton;
  public inputStrobe = inputStrobe;

  public isHelp = false;
  constructor() {
    super({
      tagName: 'div',
      classList: [styles.html__editor],
      children: [editorHeader, createLineNumbers(), inputWrapper]
    });
    this.node.insertAdjacentHTML('beforeend', EDITOR_TEXT);
    this.inputStrobe.node.onkeydown = (e): void => {
      const target = e as KeyboardEvent;
      if (target.code === 'Enter') {
        this.customEventSendResultAnswer();
      }
    };
    this.enterButton.node.onclick = (): void => {
      this.customEventSendResultAnswer();
    };
    this.inputStrobe.node.oninput = (): void => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      inputCodeHighlight.node.textContent = this.inputStrobe.node.value;
      hljs.highlightElement(inputCodeHighlight.node);
    };

    document.addEventListener('help', () => {
      this.isHelp = true;
      this.inputStrobe.node.value = String(storage.getItem(SELECTOR));
      setAnimation(styles.typing, this.inputStrobe.node);
    });
  }

  public customEventSendResultAnswer(): void {
    document.dispatchEvent(
      new CustomEvent('sendResultAnswer', {
        detail: {
          value: this.inputStrobe.node.value,
          isHelp: this.isHelp
        }
      })
    );
    this.inputStrobe.node.value = '';
    this.isHelp = false;
  }
}
