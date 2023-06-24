import { BaseComponent } from '@/core';

import styles from '../LevelList.module.scss';

export const levelItemWrapper = new BaseComponent({
  tagName: 'div',
  classList: [styles['level-item-wrapper']]
});
