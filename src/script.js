'use strict';

import { h, render } from 'preact';
import App from './components/App.jsx';

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('root'));
});

if (module.hot) {
  console.log('oh man it\'s hot');
  module.hot.accept();
} else {
  console.log('yo it\'s not hot');
}
