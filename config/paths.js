const path = require('node:path');
const fs = require('node:fs');

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
  dist: resolveApp('dist'),
  src: resolveApp('src'),
};

paths.resolveModules = [paths.src, 'node_modules'];

module.exports = paths;
