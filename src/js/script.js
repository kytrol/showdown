'use strict';

import { h, render } from 'preact';
import '../css/style.scss';
import '../assets/img/search.svg';

let root;

/**
 * Initializes Preact app.
 */
function init() {
  const App = require('./app/containers/app.jsx').default;
  root = render(<App />, document.body, root);
}

init();

// Opt in to hot module replacement.
if (module.hot) {
  module.hot.accept('./app/containers/app.jsx', _ => {
    requestAnimationFrame(init);
  });
}
