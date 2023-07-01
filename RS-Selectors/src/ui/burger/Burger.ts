import { BaseComponent } from '@/core';

export const burger = new BaseComponent({
  tagName: 'button',
  classList: ['burger-button', 'active']
});
burger.node.insertAdjacentHTML(
  'beforeend',
  ' <span></span> <span></span> <span></span>'
);
burger.node.onclick = (e): void => {
  e.preventDefault();
  burger.node.classList.toggle('_active');
  document.dispatchEvent(new CustomEvent('show-menu'));
};
