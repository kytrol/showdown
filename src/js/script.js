'use strict';

import { h, render } from 'preact';
import '../css/style.scss';
import '../assets/img/search.svg';

let root;
function init() {
  const App = require('./app/containers/app.jsx').default;
  root = render(<App />, document.body, root);
}

init();

if (module.hot) {
  module.hot.accept('./app/containers/app.jsx', () => requestAnimationFrame(init));
}
