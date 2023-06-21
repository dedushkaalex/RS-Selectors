type Props<T extends keyof HTMLElementTagNameMap> = {
  tagName?: T;
  classList?: string[];
  textContent?: string;
  children?: BaseComponent<keyof HTMLElementTagNameMap>[];
};

/**
 * @params {}
 */
export class BaseComponent<T extends keyof HTMLElementTagNameMap = 'div'> {
  public readonly node: HTMLElementTagNameMap[T];
  constructor({
    tagName,
    classList = [],
    textContent = '',
    children = []
  }: Props<T>) {
    this.node = document.createElement(
      tagName ?? 'div'
    ) as HTMLElementTagNameMap[T];
    this.node.classList.add(...classList);
    this.node.textContent = textContent;
    if (children.length) {
      this.append(...children);
    }
  }

  public append<U extends keyof HTMLElementTagNameMap>(
    ...children: Array<BaseComponent<U>>
  ): void {
    this.node.append(...children.map((component) => component.node));
  }

  public addClass(className: string): void {
    this.node.classList.add(className);
  }

  public removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  public destroy(): void {
    this.node.remove();
  }
}
