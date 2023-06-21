export type PropsCreateDOMElements = {
  tagName: string;
  className: string[];
  textContent?: string;
  children?: PropsCreateDOMElements[];
};

export function createDOMElements<T extends PropsCreateDOMElements>(
  config: Array<T>
): Array<HTMLElement> {
  const elements: Array<HTMLElement> = [];

  for (let i = 0; i < config.length; i += 1) {
    const { tagName, className, children }: PropsCreateDOMElements = config[i];
    const element = document.createElement(tagName);

    if (className && className.length > 0) {
      element.classList.add(...className);
    }

    if (children && children.length > 0) {
      const childElements = createDOMElements(children);
      childElements.forEach((childElement) => {
        element.appendChild(childElement);
      });
    }

    elements.push(element);
  }

  return elements;
}
