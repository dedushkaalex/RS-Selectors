import { BaseComponent } from '@/core';

import styles from './Editor.module.scss';

import { EDITOR_TEXT } from './models';
import {
  createLineNumbers,
  editorHeader,
  enterButton,
  inputStrobe,
  inputWrapper
} from './ui';

const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));

export class Editor extends BaseComponent {
  protected enterButton = enterButton;
  protected inputStrobe = inputStrobe;
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
        console.log(this.inputStrobe.node.value);
        document.dispatchEvent(
          new CustomEvent('sendResultAnswer', {
            detail: {
              value: this.inputStrobe.node.value
            }
          })
        );
      }
    };
  }
}
