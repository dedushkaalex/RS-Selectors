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
  }
}
