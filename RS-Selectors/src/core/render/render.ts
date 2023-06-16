import { BaseComponent } from '../base-component';

export const render = (root: HTMLElement, app: BaseComponent): void => {
  root.append(app.node);
};
