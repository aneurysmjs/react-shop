const chalk = require('chalk');
const { map, find } = require('ramda');

const NO_COMPILER_NAME = 'NO_COMPILER_NAME';

const hasEslintError = info => info.errors.some(({message}) => message.includes('eslint'));

/**
 * Logs a message to the console with color information.
 * 
 * @param {string} message message to display in the console.
 * @param {string} [level='info'] defines the color according the type of message.
 */
const logMessage = (message, level = 'info') => {
  // eslint-disable-next-line no-nested-ternary
  const color = level === 'error' ? 'red' : level === 'warning' ? 'yellow' : 'white';
  // eslint-disable-next-line no-console
  console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

/**
 * @typedef {import('webpack').Compiler} Compiler
 * @typedef {import('webpack').MultiCompiler} MultiCompiler
 */

/**
 * Executes webpack's compiler wrapped in a promise.
 * 
 * @param {Compiler} compiler
 * @return {Promise<void>}
 */
const compilerPromise = (compiler) => new Promise((resolve, reject) => {

  if (!compiler.name) {
    throw new Error(`${NO_COMPILER_NAME}: make sure the Webpack compiler has a 'name' property`)
  }

  const { name } = compiler;

  /**
   * Called right after beforeCompile, before a new compilation is created.
   * 
   * @see https://webpack.js.org/api/compiler-hooks/#compile
   */
  compiler.hooks.compile.tap(name, () => {
    logMessage(`[${name}] Compiling `);
  });

   /**
    * Executed when the compilation has completed
    * 
    * @see https://webpack.js.org/api/compiler-hooks/#done
    */
  compiler.hooks.done.tap(name, (stats) => {
    const info = stats.toJson();

    if (!stats.hasErrors() || hasEslintError(info)) {
      resolve();
    }

    return reject(new Error(`Failed to compile ${name}`));
  });
});

const COMPILER_NAMES = ['client', 'server'];

/**
 * Finds a compiler by its name.
 * 
 * @param {MultiCompiler} multiCompiler
 * @param {Compiler[]} multiCompiler.compilers
 * @return {(compilerName: string) => Compiler} webpack compiler
 */
const findCompiler = ({ compilers }) => (compilerName) => (
  find(({ name }) => name === compilerName, compilers)
);

/**
 * 
 * @param {Compiler[]} compilers
 * @return {Promise<void>[]}
 */
const makeCompilerPromise = map(compilerPromise);

/**
 * Check the presence of server side rendering flag.
 * 
 * @returns boolean
 */
const withSSR = () => process.argv.includes('--with-ssr');

const SCRIPT_TYPE = withSSR() ? 'ssr' : 'client';

module.exports = {
  COMPILER_NAMES,
  SCRIPT_TYPE,
  compilerPromise,
  findCompiler,
  logMessage,
  makeCompilerPromise,
  withSSR,
};
