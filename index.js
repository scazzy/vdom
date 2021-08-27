import { render, mount, createElement } from './dist/index.js';

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

let $app = document.getElementById('root');
setInterval(() => {
  $app = mount(render(createCountApp(count++)), $app);
}, 1000);
