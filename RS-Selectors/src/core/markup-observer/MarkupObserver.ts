import { BaseComponent } from '../base-component';

export class MarkupObserver extends BaseComponent {
  constructor(public counter: number) {
    super({
      tagName: 'div',
      classList: ['markup_code']
    });
    document.addEventListener(`hoverByTable-${this.counter}`, this.handleEvent);
    document.addEventListener(
      `cancelHoverByTable-${this.counter}`,
      this.cancelHandleEvent
    );
    // TODO: ПОТОМ это удалить
    this.node.id = `${this.counter}`;
    this.node.onmouseover = this.onMouseOverEvent;

    this.node.onmouseout = this.onMouseOutEvent;
    document.addEventListener('isWin', () => {
      this.removeEvent();
    });
  }

  public onMouseOverEvent = (e: MouseEvent): void => {
    e.stopPropagation();
    this.addClass('hover-viewer');
    document.dispatchEvent(new CustomEvent(`hoverByViewer-${this.counter}`));
  };
  public onMouseOutEvent = (): void => {
    this.removeClass('hover-viewer');
    document.dispatchEvent(
      new CustomEvent(`cancelHoverByViewer-${this.counter}`)
    );
  };
  public handleEvent = (): void => this.addClass('hover-viewer');
  public cancelHandleEvent = (): void => this.removeClass('hover-viewer');

  public removeEvent(): void {
    document.removeEventListener(
      `hoverByTable-${this.counter}`,
      this.handleEvent
    );
    document.removeEventListener(
      `cancelHoverByTable-${this.counter}`,
      this.handleEvent
    );
  }
}
