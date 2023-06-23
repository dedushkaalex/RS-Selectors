import { BaseComponent } from '@/core';

export type PropsCreateDOMElements = {
  tagName: string;
  className: string[];
  textContent?: string;
  children?: PropsCreateDOMElements[];
  isGameTarget?: string;
};
export const GAME_CONFIG = [
  [
    {
      tagName: 'hobbit',
      className: [],
      children: [],
      isGameTarget: 'hobbit'
    },
    {
      tagName: 'cplus',
      className: [],
      children: []
    },
    {
      tagName: 'javascript',
      className: [],
      children: []
    },
    {
      tagName: 'hobbit',
      className: [],
      children: [],
      isGameTarget: 'hobbit'
    }
  ],
  [
    {
      tagName: 'hobbit',
      className: [],
      children: []
    },
    {
      tagName: 'cplus',
      className: [],
      children: [
        {
          tagName: 'groming',
          className: [],
          children: [
            {
              tagName: 'javascript',
              className: [],
              children: [
                {
                  tagName: 'javascript',
                  className: [],
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      tagName: 'javascript',
      className: [],
      children: []
    }
  ]
];
