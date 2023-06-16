import { BaseComponent } from '@/core/base-component/BaseComponent';

import styles from './Table.module.scss';

import { Button } from '@/ui/button';

export class Table extends BaseComponent {
  constructor() {
    super({
      tagName: 'div',
      classList: ['game-wrapper'],
      textContent: 'Test'
    });
    this.render();
    console.log(this.store.plates);
  }

  public render(): HTMLElement {
    /*
    TODO: new BaseComponent для обычного ui можно
    */
    const element = document.createElement('div');
    element.classList.add(styles['table-wrapper']);
    this.node.append(element);
    const tableSurface = document.createElement('div');
    tableSurface.classList.add('table-surface');
    element.append(tableSurface);
    const cb = (): void => this.buttonHandler();
    const btn = new Button({ cb });
    element.append(btn.node);

    return element;
  }

  public buttonHandler(): void {
    console.log('Hello', this);
  }
}
