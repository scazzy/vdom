import { render, mount, createElement, diff } from './dist/index.js';

let count = 0;
function createCountApp(count) {
  return createElement('div', {
    id: "container",
    children: [
      'Counter',
      createElement('h1', {
        children: [
          String(count),
        ]
      })
    ],
  });
}

const $root = document.getElementById('root');
let oldVTree = createCountApp(count);
let $app = render(oldVTree);
mount($app, $root);
setInterval(() => {
  const newVTree = createCountApp(count++);
  const patch = diff(oldVTree, newVTree);
  $app = patch($app);
  oldVTree = newVTree;
}, 1000);
