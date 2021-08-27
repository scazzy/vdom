"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var createElement = function (tagName, options) {
    if (options === void 0) { options = {}; }
    var children = options.children, attrs = __rest(options, ["children"]);
    return {
        tagName: tagName,
        attrs: attrs,
        children: children,
        $node: null
    };
};
exports["default"] = createElement;
