import { BaseComponent, storage } from '@/core';

import {
  GAME_CONFIG,
  LEVEL_DESCRIPTION,
  PropsCreateDOMElements
} from '@/config/tableTemplateConfig';

import styles from './LevelList.module.scss';

import { levelItemWrapper } from './ui/level-item-wrapper';
import { ListHeader, leftButton, rightButton } from './ui/list-header';
import { CURRENT_LEVEL } from '@/constants/gameConstants';

export class LevelList extends BaseComponent {
  private configLevel: PropsCreateDOMElements[][] = GAME_CONFIG;
  private currentLevel: BaseComponent | undefined = undefined;
  constructor() {
    super({
      tagName: 'div',
      classList: [styles['level-list']],
      children: [ListHeader, levelItemWrapper]
    });
    this.render();
    document.addEventListener('isWin', () => {
      this.reRender();
    });
  }

  public render(): void {
    const currentLevel = Number(storage.getItem(CURRENT_LEVEL)) || 0;
    LEVEL_DESCRIPTION.forEach((item, index) => {
      const levelItem = new BaseComponent({
        tagName: 'div',
        classList: [styles['level-item']],
        textContent: `Level ${index + 1}: ${item.name}`
      });
      if (index === currentLevel) {
        levelItem.addClass(styles.currentLevel);
        this.currentLevel = levelItem;
      }
      levelItemWrapper.node.append(levelItem.node);
      this.bindButtonEvent();
    });
  }
  private reRender(): void {
    this.clear(levelItemWrapper);
    this.render();
  }
  private bindButtonEvent(): void {
    const levelFromStorage = Number(storage.getItem(CURRENT_LEVEL));
    const [leftBtn, rightBtn] = [leftButton.node, rightButton.node];
    leftBtn.onclick = (): void => {
      if (levelFromStorage <= 0) {
        storage.setItem(CURRENT_LEVEL, 0);
      } else {
        console.log(levelFromStorage);
        storage.setItem(CURRENT_LEVEL, levelFromStorage - 1);
      }
      document.dispatchEvent(new CustomEvent('changelvl'));
      this.reRender();
    };

    rightBtn.onclick = (): void => {
      if (levelFromStorage >= this.configLevel.length - 1) {
        storage.setItem(CURRENT_LEVEL, this.configLevel.length - 1);
      } else {
        console.log(levelFromStorage);
        storage.setItem(CURRENT_LEVEL, levelFromStorage + 1);
      }
      document.dispatchEvent(new CustomEvent('changelvl'));
      this.reRender();
    };
  }
}
