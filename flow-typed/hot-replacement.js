/**
 * @link https://stackoverflow.com/questions/43778034/flowtype-throws-an-error-on-module-hot-accept
 */
// eslint-disable-next-line no-unused-vars
declare var module: {
  hot: {
    accept(path?: string, callback?: () => void): void;
  };
};
