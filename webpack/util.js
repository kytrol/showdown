const path = require('path');

const rootPath = path.join(__dirname, '..');
const src = path.join(rootPath, 'src');
const js = name => path.join('js', `${name}.js`);

module.exports = {
  paths: {
    build: path.join(rootPath, 'public'),
    css: path.join('css', 'bundle.css'),
    js,
    src,
    sw: path.join(src, js('sw'))
  },
  jsEntry: path.join(src, js('script'))
};
