import { BaseComponent } from '@/core';

import styles from './LineNumbers.module.scss';

export const lineNumbers = new BaseComponent({
  tagName: 'div',
  classList: [styles.line__numbers]
});
