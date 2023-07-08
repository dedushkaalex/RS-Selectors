import { BaseComponent, storage } from '@/core';
import { Store } from '@/core/store/Store';

import {
  GAME_CONFIG,
  LEVEL_DESCRIPTION,
  PropsCreateDOMElements
} from '@/config/tableTemplateConfig';

import styles from './LevelList.module.scss';

import { levelItemWrapper } from './ui/level-item-wrapper';
import { ListHeader, leftButton, rightButton } from './ui/list-header';
import { CURRENT_LEVEL, PROGRESS } from '@/constants/gameConstants';
import { ProgressItem } from '@/types/types';

export class LevelList extends BaseComponent {
  private configLevel: PropsCreateDOMElements[][] = GAME_CONFIG;
  private currentLevelConfig: BaseComponent | undefined = undefined;

  private store = Store.getInstance();
  constructor() {
    super({
      tagName: 'div',
      classList: [styles['level-list']],
      children: [ListHeader, levelItemWrapper]
    });
    this.store.addObserver(this);
    this.render();
    document.addEventListener('isWin', () => {
      this.reRender();
    });
  }

  public update(): void {
    this.reRender();
  }

  public render(): void {
    const {
      state: { level: currentLevel }
    } = this.store;

    const progress: ProgressItem[] = storage.getItem(PROGRESS);
    LEVEL_DESCRIPTION.forEach((item, index) => {
      const levelItem = new BaseComponent({
        tagName: 'div',
        classList: [styles['level-item'], styles['not-correct']],
        textContent: `Level ${index + 1}: ${item.name}`
      });
      if (progress && progress.length > 0) {
        const correctLvl = progress.find((l) => l.lvl === index && !l.isHelp);
        const correctHelpLvl = progress.find(
          (l) => l.lvl === index && l.isHelp
        );
        if (correctLvl) {
          levelItem.removeClass(styles['correct-help']);
          levelItem.removeClass(styles['not-correct']);
          levelItem.addClass(styles.correct);
        } else if (correctHelpLvl) {
          levelItem.addClass(styles['correct-help']);
        }
      }
      if (index === currentLevel) {
        levelItem.addClass(styles.currentLevel);
        this.currentLevelConfig = levelItem;
      }
      levelItemWrapper.node.append(levelItem.node);
      this.bindButtonEvent();
    });
  }
  public reRender(): void {
    this.clear(levelItemWrapper);
    this.render();
  }
  private bindButtonEvent(): void {
    const {
      state: { level: currentLevel }
    } = this.store;
    const [leftBtn, rightBtn] = [leftButton.node, rightButton.node];
    leftBtn.onclick = (): void => {
      if (currentLevel <= 0) {
        this.store.updateLevel(0);
      } else {
        this.store.updateLevel(currentLevel - 1);
      }
    };

    rightBtn.onclick = (): void => {
      if (currentLevel >= this.configLevel.length - 1) {
        this.store.updateLevel(this.configLevel.length - 1);
      } else {
        this.store.updateLevel(this.store.state.level + 1);
      }
    };
  }
}
