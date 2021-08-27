function renderElement(vNode) {
    const $node = document.createElement(vNode.tagName);
    for (const [k, v] of Object.entries(vNode.attrs || {})) {
        $node.setAttribute(k, v);
    }
    for (const childNode of vNode.children) {
        $node.appendChild(render(childNode));
    }
    return $node;
}
function renderText(str) {
    return document.createTextNode(str);
}
function render(vNode) {
    if (vNode === undefined || vNode === null)
        return null;
    if (typeof vNode === 'string' || typeof vNode === 'number')
        return renderText(vNode);
    return renderElement(vNode);
}
export default render;
