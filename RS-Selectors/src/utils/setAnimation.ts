export const setAnimation = <T extends HTMLElement>(
  className: string,
  element: T
): void => {
  element.classList.add(className);
  element.onanimationend = (): void => element.classList.remove(className);
};
