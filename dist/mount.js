"use strict";
exports.__esModule = true;
var render_1 = require("./render");
function mount(vNode, $container) {
    if (!$container || !($container instanceof HTMLElement))
        throw new Error('Container expected of type HTMLElement');
    $container.replaceWith((0, render_1["default"])(vNode));
}
exports["default"] = mount;
