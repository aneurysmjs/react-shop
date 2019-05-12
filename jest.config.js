const paths = require('./config/paths');

module.exports = {
  verbose: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
  setupFiles: [
    '<rootDir>/node_modules/regenerator-runtime/runtime',
    '<rootDir>/config/polyfills.js',
  ],
  // A list of paths to modules that run some code to configure or set up the testing framework before each test.
  setupFilesAfterEnv: ['<rootDir>config/jest/setup.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}',
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  modulePaths: ['src'],
  moduleNameMapper: {
    // '/^@/(.*)$/': '<rootDir>/src/app$1',
    /**
     * @link https://github.com/vuejs-templates/webpack/issues/807
     */
    '^@[/](.+)': '<rootDir>/src/app/$1',

  },
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleDirectories: paths.resolveModules,
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'mjs'],
};