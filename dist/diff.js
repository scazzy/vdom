import render from "./render.js";
function diffAttrs(oldAttrs, newAttrs) {
    const patches = [];
    for (const k in oldAttrs) {
        if (!newAttrs.hasOwnProperty(k)) {
            patches.push(($node) => {
                $node.removeAttribute(k);
            });
        }
    }
    for (const [k, v] of Object.entries(newAttrs)) {
        if (!oldAttrs.hasOwnProperty(k)) {
            patches.push(($node) => {
                $node.setAttribute(k, v);
            });
        }
    }
    return ($node) => {
        patches.forEach(patch => {
            patch($node);
        });
    };
}
function diffChildren(oldVChildren, newVChildren) {
    const childPatches = [];
    const patches = [];
    for (const i in oldVChildren) {
        childPatches.push(diff(oldVChildren[i], newVChildren[i]));
    }
    for (const childVNode of newVChildren.slice(oldVChildren.length)) {
        patches.push(($node) => {
            $node.appendChild(render(childVNode));
        });
    }
    return ($parent) => {
        $parent.childNodes.forEach(($node, i) => {
            childPatches[i]($node);
        });
        patches.forEach(patch => {
            patch($parent);
        });
        return $parent;
    };
}
export default function diff(oldVTree, newVTree) {
    if (newVTree === undefined) {
        return ($node) => {
            $node.remove();
            return undefined;
        };
    }
    if (typeof oldVTree === 'string' || typeof newVTree === 'string') {
        if (oldVTree !== newVTree) {
            return ($node) => {
                $node.replaceWith(render(newVTree));
            };
        }
        else {
            return ($node) => $node;
        }
    }
    if (oldVTree.tagName !== newVTree.tagName) {
        return ($node) => {
            $node.replaceWith(render(newVTree));
        };
    }
    const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs);
    const patchChildren = diffChildren(oldVTree.children, newVTree.children);
    return ($node) => {
        patchAttrs($node);
        patchChildren($node);
        return $node;
    };
}
