'use strict';

import { h, render } from 'preact';

let root;
function init() {
  const App = require('./components/app.jsx').default;
  root = render(<App />, document.body, root);
}

init();

if (module.hot) {
  module.hot.accept('./components/app.jsx', () => requestAnimationFrame(init));
}
