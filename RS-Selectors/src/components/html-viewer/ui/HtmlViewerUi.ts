import { BaseComponent } from '@/core';

import styles from '../Viewer.module.scss';

export const viewerHeader = new BaseComponent({
  tagName: 'div',
  classList: [styles.viewer__header]
});
viewerHeader.node.insertAdjacentHTML(
  'beforeend',
  '<span>HTML Viewer</span><span>table.html</span>'
);

export const lineNumbers = new BaseComponent({
  tagName: 'div',
  classList: [styles.line__numbers]
});

const arrayNumbers = Array(17)
  .fill(0)
  .map((_, index) => `<span>${index + 1}</span>`);
lineNumbers.node.innerHTML = arrayNumbers.join('');

// export const codeMarkupCode = new BaseComponent({
//   tagName: 'code',
//   classList: ['viewer'],
//   children: []
// });

// export const codeMarkupHighlightWrapper = new BaseComponent({
//   tagName: 'pre',
//   classList: [],
//   children: []
// });

export const markupObserversWrapper = new BaseComponent({
  tagName: 'div',
  classList: ['markup_block']
});
