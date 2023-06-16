import { BaseComponent } from '@/core';

export class HTMLViewer extends BaseComponent {
  constructor() {
    super({
      tagName: 'div',
      classList: ['viewer'],
      textContent: 'Test'
    });
    console.log(this.store.selectors);
  }
}
