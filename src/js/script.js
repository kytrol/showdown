'use strict';

import { h, render } from 'preact';
import '../css/style.scss';

let root;
function init() {
  const App = require('./app/components/app.jsx').default;
  root = render(<App />, document.body, root);
}

init();

if (module.hot) {
  module.hot.accept('./app/components/app.jsx', () => requestAnimationFrame(init));
}
