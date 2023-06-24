import { BaseComponent } from '@/core';

import styles from '../LevelList.module.scss';

export const rightButton = new BaseComponent({
  tagName: 'a',
  classList: [styles['button-right']]
});

export const leftButton = new BaseComponent({
  tagName: 'a',
  classList: [styles['button-left']]
});

const buttonWrapper = new BaseComponent({
  tagName: 'div',
  classList: [styles['button-wrapper']],
  children: [leftButton, rightButton]
});

const title = new BaseComponent({
  tagName: 'h2',
  classList: [styles.title],
  textContent: 'Levels'
});

export const ListHeader = new BaseComponent({
  tagName: 'div',
  classList: [styles['list-header']],
  children: [title, buttonWrapper]
});
