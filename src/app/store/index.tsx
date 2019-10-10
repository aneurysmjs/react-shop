import configureStore from './config/configureStore';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('~/store/config/dynoStore', () =>
      // eslint-disable-next-line implicit-arrow-linebreak, global-require
      require('~/store/config/dynoStore').default.reloadStore(),
    );
  }
}

export default store;
