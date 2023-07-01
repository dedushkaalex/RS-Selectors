import { BaseComponent } from '@/core';

import styles from './header.module.scss';

import github from '../../assets/images/icon/github.svg';
import mail from '../../assets/images/icon/mail.svg';

import { burger } from '@/ui/burger/Burger';

export class Header extends BaseComponent {
  constructor() {
    super({
      tagName: 'div',
      classList: [styles.header]
    });
    this.render();
  }

  private render(): void {
    const menuList = new BaseComponent({
      tagName: 'ul',
      classList: [styles['menu-list']]
    });
    const headerTitle = new BaseComponent({
      tagName: 'a',
      classList: [styles['header-title']],
      textContent: 'CSS Books'
    });
    const headerNav = new BaseComponent({
      tagName: 'nav',
      classList: [styles.nav],
      children: [headerTitle, menuList, burger]
    });

    headerTitle.node.href = '#';
    menuList.node.insertAdjacentHTML('beforeend', this.menuItem());
    this.node.append(headerNav.node);
  }

  private menuItem(): string {
    const el = `
    <li class="${styles.menu__item}">
      <a href="https://mail.yandex.ru/compose?mailto=proger@a1exxuss.ru&subject=Вопрос&nbsp;по&nbsp;Shelter&body=Как&nbsp;вам&nbsp;мой&nbsp;сайт?Если&nbsp;понравился,&nbsp;то&nbsp;напишите" target="_blank">
      <img src="${mail}" alt=""></a>
    </li>
    <li class="${styles.menu__item}">
    <a href="https://github.com/dedushkaalex" target="_blank"><img src="${github}" alt=""></a>
    </li>
    `;
    return el;
  }
}
