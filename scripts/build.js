const { clientOnly } = require('./utils');

if (clientOnly()) {
  // eslint-disable-next-line no-console
  console.log('clientONLY madafacka');
  // eslint-disable-next-line global-require
  require('./buildClient');
} else {
  // eslint-disable-next-line global-require
  require('./buildSSR');
}
