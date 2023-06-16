import { Table } from '@components/table/Table';

import { BaseComponent } from '@/core/base-component/BaseComponent';

import '@/styles/global.scss';

import { App } from './app';
import { render } from './core/render';

render(document.getElementById('root') as HTMLElement, new App());
