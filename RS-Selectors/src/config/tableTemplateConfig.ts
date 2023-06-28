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
          children: [],
          isGameTarget: 'cplus groming'
        }
      ]
    },
    {
      tagName: 'javascript',
      className: [],
      children: []
    }
  ],
  [
    {
      tagName: 'hobbit',
      className: [],
      children: []
    },
    {
      tagName: 'groming',
      className: [],
      children: []
    },
    {
      tagName: 'javascript',
      className: ['js'],
      children: [],
      isGameTarget: '.js'
    }
  ],
  [
    {
      tagName: 'hobbit',
      className: [],
      children: []
    },
    {
      tagName: 'groming',
      className: ['grmng'],
      children: [
        {
          tagName: 'cplus',
          className: [],
          children: [],
          isGameTarget: '.grmng cplus'
        }
      ]
    },
    {
      tagName: 'javascript',
      className: [],
      children: []
    }
  ],
  [
    {
      tagName: 'python',
      className: [],
      children: []
    },
    {
      tagName: 'groming',
      className: [],
      children: [
        {
          tagName: 'javascript',
          className: [],
          children: [],
          isGameTarget: 'groming > javascript'
        }
      ]
    },
    {
      tagName: 'cplus',
      className: [],
      children: []
    }
  ],
  [
    {
      tagName: 'javascript',
      className: [],
      children: []
    },
    {
      tagName: 'cplus',
      className: [],
      children: []
    },
    {
      tagName: 'groming',
      className: [],
      children: [
        {
          tagName: 'python',
          className: [],
          children: [],
          isGameTarget: 'groming > python:first-child'
        },
        {
          tagName: 'python',
          className: [],
          children: []
        }
      ]
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
      className: ['good'],
      children: [],
      isGameTarget: 'cplus.good'
    },
    {
      tagName: 'javascript',
      className: [],
      children: []
    },
    {
      tagName: 'hobbit',
      className: [],
      children: []
    }
  ],
  [
    {
      tagName: 'groming',
      className: ['groming-book'],
      children: [
        {
          tagName: 'cplus',
          className: ['cPlusPlus'],
          children: [],
          isGameTarget: '.groming-book:last-child,groming-book:last-child'
        }
      ]
    },
    {
      tagName: 'javascript',
      className: [],
      children: []
    },
    {
      tagName: 'typescript',
      className: [],
      children: [],
      isGameTarget: '.groming-book:last-child,typescript:last-child'
    }
  ],
  [
    {
      tagName: 'groming',
      className: ['groming-book'],
      children: [
        {
          tagName: 'cplus',
          className: ['cPlusPlus'],
          children: [
            {
              tagName: 'javascript',
              className: [],
              children: [],
              isGameTarget: '*'
            }
          ],
          isGameTarget: '*'
        }
      ],
      isGameTarget: '*'
    },
    {
      tagName: 'javascript',
      className: [],
      children: [],
      isGameTarget: '*'
    },
    {
      tagName: 'typescript',
      className: [],
      children: [],
      isGameTarget: '*'
    }
  ],
  [
    {
      tagName: 'groming',
      className: ['groming-book'],
      children: []
    },
    {
      tagName: 'javascript',
      className: [],
      children: []
    },
    {
      tagName: 'cplus',
      className: ['cPlusPlus'],
      children: []
    },
    {
      tagName: 'typescript',
      className: [],
      children: [],
      isGameTarget: ':nth-child(4)'
    }
  ]
];

export type LevelDescription = {
  name: string;
};
export const LEVEL_DESCRIPTION: LevelDescription[] = [
  {
    name: 'A'
  },
  {
    name: 'A B'
  },
  {
    name: '.A'
  },
  {
    name: '.class A'
  },
  {
    name: 'A > B'
  },
  {
    name: 'B: first-child'
  },
  {
    name: 'A.className'
  },
  {
    name: ':last-child'
  },
  {
    name: '*'
  },
  {
    name: ':nth-child(A)'
  }
];
