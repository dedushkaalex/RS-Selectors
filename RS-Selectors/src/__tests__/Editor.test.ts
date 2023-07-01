/**
 * @jest-environment jsdom
 */

/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable max-lines-per-function */

/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable no-var */

/* eslint-disable vars-on-top */

/* eslint-disable no-global-assign */

/* eslint-disable @typescript-eslint/explicit-function-return-type */

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Editor } from '@/components';

describe('Editor', () => {
  let editor: Editor;

  beforeEach(() => {
    // Создаем новый экземпляр Editor перед каждым тестом
    editor = new Editor();
  });

  afterEach(() => {
    // Удаляем editor после каждого теста
    editor.destroy();
  });

  it('should handle input event on inputStrobe', () => {
    const event = new Event('input');

    // Имитируем событие input на inputStrobe
    editor.inputStrobe.node.dispatchEvent(event);
  });

  it('should handle help event', () => {
    const event = new Event('help');

    // Имитируем событие help на document
    document.dispatchEvent(event);

    // Проверяем, что isHelp был установлен в true
    expect(editor.isHelp).toBe(true);
  });

  it('should dispatch sendResultAnswer event', () => {
    const event = new CustomEvent('sendResultAnswer', {
      detail: {
        value: 'test value',
        isHelp: false
      }
    });

    // Создаем шпиона на методе document.dispatchEvent
    const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');

    // Имитируем вызов customEventSendResultAnswer
    editor.customEventSendResultAnswer();

    // Проверяем, что sendResultAnswer event был отправлен с правильными данными
    expect(dispatchEventSpy).toHaveBeenCalledWith(event);

    // Восстанавливаем оригинальный метод
    dispatchEventSpy.mockRestore();
  });
});
