module.exports = (env = 'production') => {
  if (env === 'development' || env === 'dev') {
    process.env.NODE_ENV = 'development';
    return [require('./client/client.dev'), require('./server/server.dev')];
  }
  process.env.NODE_ENV = 'production';
  return [require('./client/client.prod'), require('./server/server.prod')];
};
