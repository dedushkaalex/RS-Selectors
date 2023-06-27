import { BaseComponent } from '@/core';

import styles from '../Editor.module.scss';

import { EDITOR_HEADING } from '../models/constants';

export const editorHeader = new BaseComponent({
  tagName: 'div',
  classList: [styles.editor__header]
});
editorHeader.node.insertAdjacentHTML('beforeend', EDITOR_HEADING);

export const inputStrobe = new BaseComponent({
  tagName: 'input',
  classList: [styles['input-strobe']]
});
inputStrobe.node.placeholder = 'Type in a CSS selector';

export const enterButton = new BaseComponent({
  tagName: 'button',
  classList: [styles['enter-button']],
  textContent: 'enter'
});

export const inputCodeHighlight = new BaseComponent({
  tagName: 'code',
  classList: ['language-css']
});

const inputCodePre = new BaseComponent({
  tagName: 'pre',
  classList: [styles['input-code']],
  children: [inputCodeHighlight]
});

export const inputWrapper = new BaseComponent({
  tagName: 'div',
  classList: [styles.input__wrapper]
});
inputWrapper.append(inputStrobe, enterButton);

export const createLineNumbers = (): BaseComponent => {
  const arraySpanOfLineNumbers = Array(17)
    .fill(0)
    .map(
      (_, index) =>
        new BaseComponent({ tagName: 'span', textContent: `${index + 1}` })
    );

  const lineNumbers = new BaseComponent({
    tagName: 'div',
    classList: [styles.line__numbers],
    children: [...arraySpanOfLineNumbers]
  });

  return lineNumbers;
};
