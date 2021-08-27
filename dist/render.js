"use strict";
exports.__esModule = true;
function renderElement(vNode) {
    var $node = document.createElement(vNode.tagName);
    for (var _i = 0, _a = Object.entries(vNode.attrs); _i < _a.length; _i++) {
        var _b = _a[_i], k = _b[0], v = _b[1];
        $node.setAttribute(k, v);
    }
    for (var _c = 0, _d = vNode.children; _c < _d.length; _c++) {
        var childNode = _d[_c];
        $node.appendChild(render(childNode));
    }
    return $node;
}
function renderText(str) {
    return document.createTextNode(str);
}
function render(vNode) {
    if (!vNode)
        return undefined;
    if (typeof vNode === 'string')
        return renderText(vNode);
    return renderElement(vNode);
}
exports["default"] = render;
