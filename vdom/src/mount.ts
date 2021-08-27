import { VNode as TypeVNode } from './types';
import render from './render';

function mount(vNode: TypeVNode, $container: HTMLElement) {
  if (!$container || !($container  instanceof HTMLElement))
    throw new Error('Container expected of type HTMLElement');

  $container.replaceWith(render(vNode));
}

export default mount;
