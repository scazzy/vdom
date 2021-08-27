import { VNode as TypeVNode } from './types';

/**
 * Takes a Virtual DOM Node and return a real HTML DOM Node
 * @param vNode object TypeVNode
 * @returns HTMLElement
 */
function renderElement(vNode: TypeVNode): HTMLElement {
  const $node = document.createElement(vNode.tagName);
  for (const [k, v] of Object.entries(vNode.attrs)) {
    $node.setAttribute(k, v);
  }
  for (const childNode of vNode.children) {
    $node.appendChild(render(childNode));
  }
  return $node;
}

/**
 * Takes a string and returns DOM TextNode
 * @param str string
 * @returns DOMTextNode
 */
function renderText(str: string): Text {
  return document.createTextNode(str);
}

function render(vNode: TypeVNode): HTMLElement|Text {
  if (!vNode) return undefined;
  if (typeof vNode === 'string') return renderText(vNode);
  return renderElement(vNode);
}

export default render;
