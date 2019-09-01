const webpack = require('webpack');
const rimraf = require('rimraf');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');

const webpackConfig = require('../config/webpack-config')(process.env.NODE_ENV || 'production');

const paths = require('../config/paths');
const {
  COMPILER_NAMES,
  findCompiler,
  logMessage,
  makeCompilerPromise,
} = require('./utils');

const generateStaticHTML = async () => {
  /* eslint-disable global-require */
  const nodemon = require('nodemon');
  const fs = require('fs');
  const puppeteer = require('puppeteer');
  /* eslint-enable global-require */
  const port = await choosePort('localhost', 8505);

  process.env.PORT = port;

  const script = nodemon({
    script: `${paths.serverBuild}/server.js`,
    ignore: ['*'],
  });

  script.on('start', async () => {
    try {
      // browser: created when puppeteer connects to a Chromium instance
      const browser = await puppeteer.launch();
      // provides methods to interact with a tab or extension
      const page = await browser.newPage();
      // navigate to page
      await page.goto(`http://localhost:${port}`);
      const pageContent = await page.content();
      fs.writeFileSync(`${paths.clientBuild}/index.html`, pageContent);
      await browser.close();
      script.emit('quit');
    } catch (err) {
      script.emit('quit');
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });

  script.on('exit', (code) => {
    process.exit(code);
  });

  script.on('crash', () => {
    process.exit(1);
  });
};

const buildSSR = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  const [clientConfig, serverConfig] = webpackConfig;
  const multiCompiler = webpack([clientConfig, serverConfig]);

  const getCompiler = findCompiler(multiCompiler);

  const [clientCompiler, serverCompiler] = COMPILER_NAMES.map(getCompiler);
  const [clientPromise, serverPromise] = makeCompilerPromise([clientCompiler, serverCompiler]);

  serverCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      // eslint-disable-next-line no-console
      console.log(stats.toString(serverConfig.stats));
      // eslint-disable-next-line no-useless-return
      return;
    }
  });

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      // eslint-disable-next-line no-console
      console.log(stats.toString(clientConfig.stats));
      // eslint-disable-next-line no-useless-return
      return;
    }
  });

  // wait until client and server is compiled
  try {
    await serverPromise;
    await clientPromise;
    await generateStaticHTML();
    logMessage('Client and Server done!', 'info');
  } catch (error) {
    logMessage(error, 'error');
  }
};

buildSSR();
