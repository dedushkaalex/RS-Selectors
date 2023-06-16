import { BaseComponent } from '@/core';

import styles from './Editor.module.scss';

export class Editor extends BaseComponent {
  constructor() {
    super({
      tagName: 'div',
      classList: [styles.html__editor]
    });
    this.render();
  }

  private render(): void {
    const editorHeader = new BaseComponent({
      tagName: 'div',
      classList: [styles.editor__header]
    });
    editorHeader.node.insertAdjacentHTML(
      'beforeend',
      '<span>CSS Editor</span><span>style.css</span>'
    );
    this.node.append(editorHeader.node);
    const lineNumbers = new BaseComponent({
      tagName: 'div',
      classList: [styles.line__numbers]
    });
    this.node.append(lineNumbers.node);
    for (let i = 0; i < 20; i += 1) {
      lineNumbers.node.innerHTML += `<span>${i + 1}</span>`;
    }
    const inputWrapper = new BaseComponent({
      tagName: 'div',
      classList: [styles.input__wrapper]
    });
    const inputStrobe = new BaseComponent({
      tagName: 'input',
      classList: [styles['input-strobe']]
    });
    inputStrobe.node.placeholder = 'Type in a CSS selector';
    this.node.append(inputWrapper.node);
    inputWrapper.append(inputStrobe);
    this.node.insertAdjacentHTML(
      'beforeend',
      `
      <code>
      <p style="color: green">{</p>
      <p>/* Styles would go here. */</p>
      <p style="color: green">}</p></br>
      <p>/*</p
      <p>Type a number to skip to a level.</br>Ex → "5" for level 5</p
      <p>*/</p>

      </code>
      `
    );
    const enterButton = new BaseComponent({
      tagName: 'button',
      classList: [styles['enter-button']],
      textContent: 'enter'
    });
    inputWrapper.append(enterButton);
  }
}
