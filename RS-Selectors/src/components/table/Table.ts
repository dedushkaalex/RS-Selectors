import { BaseComponent } from '@/core/base-component/BaseComponent';

import styles from './Table.module.scss';

import { tableEdge, tableWrapper } from './ui/TableUi';
import { Button } from '@/ui/button';

export class Table extends BaseComponent {
  constructor() {
    super({
      tagName: 'div',
      classList: [styles['game-wrapper']],
      children: [tableWrapper, tableEdge]
    });
  }
}
