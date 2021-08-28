import render from "./render.js";
import { Attributes, VNode } from "./types.js";

// diff of attributes
function diffAttrs(oldAttrs: Attributes, newAttrs: Attributes) {
  const patches:Function[] = [];

  // attrs missing from $node
  for (const k in oldAttrs) {
    if (!newAttrs.hasOwnProperty(k)) {
      patches.push(($node:HTMLElement) => {
        $node.removeAttribute(k);
      });
    }
  }

  // new attrs added
  for (const [k, v] of Object.entries(newAttrs)) {
    if (!oldAttrs.hasOwnProperty(k)) {
      patches.push(($node:HTMLElement) => {
        $node.setAttribute(k, v);
      });
    }
  }

  return ($node: HTMLElement) => {
    patches.forEach(patch => {
      patch($node);
    })
  }
}

function diffChildren(oldVChildren: VNode[], newVChildren: VNode[]) {
  const childPatches: Function[] = [];
  const patches: Function[] = [];

  // Update child nodes
  for (const i in oldVChildren) {
    childPatches.push(diff(oldVChildren[i], newVChildren[i]));
  }

  // Add nodes
  for (const childVNode of newVChildren.slice(oldVChildren.length)) {
    patches.push(($node: HTMLElement) => {
      $node.appendChild(render(childVNode));
    });
  }

  return ($parent: HTMLElement) => {
    $parent.childNodes.forEach(($node, i) => {
      childPatches[i]($node);
    });
    patches.forEach(patch => {
      patch($parent);
    });
    return $parent;
  }
}

export default function diff(oldVTree: VNode, newVTree: VNode): Function {  
  if (newVTree === undefined) {
    return ($node: HTMLElement): undefined => {
      $node.remove();
      return undefined;
    }
  }

  if (typeof oldVTree === 'string' || typeof newVTree === 'string') {
    if (oldVTree !== newVTree) {
      return ($node: HTMLElement) => {
        $node.replaceWith(render(newVTree));
      }
    } else {
      return ($node: string) => $node;
    }
  }

  // if (!oldVTree && newVTree) {
  //   return ($node: HTMLElement) => {
  //     $node.replaceWith(render(oldVTree));
  //   }
  // }

  if (oldVTree.tagName !== newVTree.tagName) {
    return ($node: HTMLElement) => {
      $node.replaceWith(render(newVTree));
    }
  }

  const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs);
  const patchChildren = diffChildren(oldVTree.children, newVTree.children);
  
  return ($node: HTMLElement) => {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  }
}
