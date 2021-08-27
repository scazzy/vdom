import { VNode as TypeVNode } from './types.js';
import render from './render.js';

function mount($node: HTMLElement, $target: HTMLElement) {
  if (!$target || !($target  instanceof HTMLElement))
    throw new Error('target expected of type HTMLElement');

  $target.replaceWith($node);
  return $node;
}

export default mount;
