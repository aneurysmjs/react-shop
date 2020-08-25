import configureStore from './config/configureStore';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('~/store/config/alienStore', () =>
      // eslint-disable-next-line implicit-arrow-linebreak, global-require, @typescript-eslint/no-var-requires
      require('~/store/config/alienStore').default.reloadStore(),
    );
  }
}

export default store;
