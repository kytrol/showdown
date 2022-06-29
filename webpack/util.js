const path = require('path');

const rootPath = path.join(__dirname, '..');
const src = path.join(rootPath, 'src');

/**
 * Creates relative path to JavaScript file.
 * @param  {String} name  Name of file
 * @return {String}       Relative path to file
 */
const js = name => path.join('js', `${name}.js`);

/**
 * Joins a relative path to the src path.
 * @param  {String} relPath  Relative path to join
 * @return {String}          Absolute path
 */
const joinSrc = relPath => path.join(src, relPath);

module.exports = {
  paths: {
    build: path.join(rootPath, 'public'),
    css: path.join('css', 'bundle.css'),
    js,
    src,
    sw: joinSrc(js('sw'))
  },
  jsEntry: joinSrc(js('script'))
};
