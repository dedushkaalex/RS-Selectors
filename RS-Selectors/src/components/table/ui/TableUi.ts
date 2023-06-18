import { BaseComponent } from '@/core';

import styles from '../Table.module.scss';

export const tableSurface = new BaseComponent({
  tagName: 'div',
  classList: [styles['table-surface']]
});
export const nameTags = new BaseComponent({
  tagName: 'div',
  classList: [styles.nametags]
});
export const table = new BaseComponent({
  tagName: 'div',
  classList: [styles.table]
});
export const tableWrapper = new BaseComponent({
  tagName: 'div',
  classList: [styles['table-wrapper']],
  children: [tableSurface, nameTags, table]
});
// this.node.append(tableWrapper.node);

export const tableEdge = new BaseComponent({
  tagName: 'div',
  classList: [styles['table-edge']],
  children: [
    new BaseComponent({
      tagName: 'div',
      classList: [styles['table-leg']]
    }),
    new BaseComponent({
      tagName: 'div',
      classList: [styles['table-leg']]
    })
  ]
});
