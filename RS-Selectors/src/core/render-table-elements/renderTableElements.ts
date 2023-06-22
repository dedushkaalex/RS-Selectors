export type PropsCreateDOMElements = {
  tagName: string;
  className: string[];
  textContent?: string;
  children?: PropsCreateDOMElements[];
};
let counter = 0;
export function createDOMElements<T extends PropsCreateDOMElements>(
  config: Array<T>
): Array<HTMLElement> {
  const elements: Array<HTMLElement> = [];

  for (let i = 0; i < config.length; i += 1) {
    const { tagName, className, children }: PropsCreateDOMElements = config[i];
    const element = document.createElement(tagName);
    element.id = `${counter}`;
    counter += 1;

    if (className && className.length > 0) {
      element.classList.add(...className);
    }

    if (children && children.length > 0) {
      const childElements = createDOMElements(children);
      childElements.forEach((childElement, index) => {
        element.appendChild(childElement);
        if (i % 2 !== 0) {
          childElement.style.rotate = '20deg';
          childElement.style.transform = 'translateY(-1rem)';
        }
        if (i % 2 === 0) {
          childElement.style.rotate = '-40deg';
          childElement.style.transform = 'translateY(-1rem)';
        }
      });
    }

    elements.push(element);
  }

  return elements;
}
