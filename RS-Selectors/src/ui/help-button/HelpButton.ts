import { BaseComponent } from '@/core';

import styles from './HelpButton.module.scss';

export const helpButton = new BaseComponent({
  tagName: 'a',
  classList: [styles['help-button']],
  textContent: 'Help'
});
helpButton.node.href = '#';

helpButton.node.onclick = (e): void => {
  e.preventDefault();
  document.dispatchEvent(new CustomEvent('help'));
};
