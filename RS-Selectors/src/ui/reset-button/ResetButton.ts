import { BaseComponent } from '@/core';

import styles from './ResetButton.module.scss';

export const resetButton = new BaseComponent({
  tagName: 'a',
  classList: [styles['reset-button']],
  textContent: 'Clear Progress'
});
resetButton.node.href = '#';

resetButton.node.onclick = (e): void => {
  e.preventDefault();
  document.dispatchEvent(new CustomEvent('reset'));
};
