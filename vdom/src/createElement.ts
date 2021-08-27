/**
 * Usage
 * const Component = VDOM.createElement('div', { attrs: {}, children: [] })
 * const HTMLElement = render(Component) // returns DOM of the component
 * mount(element, HTMLElement);
 */
import { VNode as TypeVNode } from './types';

type CreateElementAttributeProps = {
  children?: TypeVNode[],
  attrs?: object,
}
/**
 * createElement represents a Virtual DOM Node for a Virtual DOM tree
 * @param tagName string Eg, div, img
 * @param options object <CreateElementAttributeProps>
 * @returns object <CreateElementReturn>
 */
const createElement = function (tagName: string, options: CreateElementAttributeProps = {}) : TypeVNode {
  const {children, ...attrs} = options;
  return {
    tagName,
    attrs,
    children,
    $node: null,
  }
}

export default createElement;
