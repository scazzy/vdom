export type Attributes = object;

export type VNode = {
  tagName: string,
  attrs: Attributes,
  children: VNode[],
  $node: HTMLElement | null
}
