import { BaseComponent, storage } from '@/core';

import { GAME_CONFIG } from '@/config/tableTemplateConfig';

import styles from './Modal.module.scss';

import { button, modalComponent } from './ui/ModalUi';
import { PROGRESS } from '@/constants/gameConstants';
import { ProgressItem } from '@/types/types';

class Modal extends BaseComponent {
  private button = button;
  constructor() {
    super({
      tagName: 'div',
      classList: [styles.modal__wrapper, styles.off],
      children: [modalComponent]
    });

    document.addEventListener('isWin', () => {
      const completedLevelCount = (storage.getItem(PROGRESS) as ProgressItem[])
        .length;
      const sumlevel = GAME_CONFIG.length;

      if (completedLevelCount === sumlevel) {
        this.removeClass(styles.off);
        modalComponent.removeClass(styles.off);
      }
    });
    this.button.node.onclick = (e): void => {
      e.preventDefault();
      this.addClass(styles.off);
      modalComponent.addClass(styles.off);
    };
  }
}
export const Popup = new Modal();
