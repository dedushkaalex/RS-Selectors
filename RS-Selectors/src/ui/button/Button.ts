import { BaseComponent } from '@/core/base-component/BaseComponent';

import styles from './Button.module.scss';

type Props = {
  cb: () => void;
};

export class Button extends BaseComponent<'button'> {
  constructor({ cb }: Props) {
    super({
      tagName: 'button',
      classList: [styles.button],
      textContent: 'MyBtn'
    });
    this.node.onclick = cb;
  }
}
