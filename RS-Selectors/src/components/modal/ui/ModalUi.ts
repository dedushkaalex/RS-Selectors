import { BaseComponent } from '@/core';

import styles from '../Modal.module.scss';

export const modalHeader = new BaseComponent({
  tagName: 'h2',
  classList: []
  // textContent: 'Congratulations! You Won the CSS Book'
});
const modalHeadingTextContent = `
<span style="--i:1">C</span>
   <span style="--i:2">o</span>
   <span style="--i:3">n</span>
   <span style="--i:4">g</span>
   <span style="--i:5">r</span>
   <span style="--i:6">a</span>
   <span style="--i:7">t</span>
   <span style="--i:8">u</span>
   <span style="--i:9">l</span>
   <span style="--i:10">a</span>
   <span style="--i:11">t</span>
   <span style="--i:12">i</span>
   <span style="--i:13">o</span>
   <span style="--i:14">n</span>
   <span style="--i:15">s!&nbsp;</span>
   <span style="--i:16">Y</span>
   <span style="--i:17">o</span>
   <span style="--i:18">u&nbsp;</span>
   <span style="--i:19">W</span>
   <span style="--i:20">o</span>
   <span style="--i:21">n&nbsp;</span>
   <span style="--i:22">T</span>
   <span style="--i:23">h</span>
   <span style="--i:24">e&nbsp;</span>
   <span style="--i:25">C</span>
   <span style="--i:26">S</span>
   <span style="--i:27">S&nbsp;</span>
   <span style="--i:28">B</span>
   <span style="--i:29">o</span>
   <span style="--i:30">o</span>
   <span style="--i:31">k</span>
`;
modalHeader.node.insertAdjacentHTML('beforeend', modalHeadingTextContent);

export const contentModal = new BaseComponent({
  tagName: 'div',
  classList: [styles.content],
  textContent: `Thank you dear reviewer-1 for completing the game. Yes, the design may not be very good, but I focused on architecture in order to learn how to write good code. Thanks for the rating and good luck to all of us in training`
});

export const button = new BaseComponent({
  tagName: 'button',
  classList: [styles['toggle-button']],
  textContent: 'Ok'
});

export const actions = new BaseComponent({
  tagName: 'div',
  classList: [styles.actions],
  children: [button]
});

export const modalComponent = new BaseComponent({
  tagName: 'div',
  classList: [styles.modal, styles.off],
  children: [modalHeader, contentModal, actions]
});
