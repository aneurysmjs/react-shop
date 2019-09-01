const rimraf = require('rimraf');
const paths = require('../config/paths');
const { clientOnly } = require('./utils');

rimraf.sync(paths.clientBuild);
rimraf.sync(paths.serverBuild);

if (clientOnly()) {
  // eslint-disable-next-line global-require
  require('./startClient');
} else {
  // eslint-disable-next-line global-require
  require('./startSSR');
}
