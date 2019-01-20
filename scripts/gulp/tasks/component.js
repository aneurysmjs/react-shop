'use strict';

import '@babel/register';

import gulp from 'gulp';
import path from 'path';
import rename from 'gulp-rename';
import template from 'gulp-template';
import yargs from 'yargs';

import {
  resolveFolderPath,
  capitalCase,
  camelToDashCase,
  componentPath
} from '../../utils';

gulp.task('component', () => {

  // extract the arguments that was given in the CLI
  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || '';
  const folder = yargs.argv.folder || 'components';
  const destPath = path.join(resolveFolderPath(folder), parentPath, capitalCase(name));

  return gulp.src(componentPath)
    .pipe(template({
      name,
      upCaseName: capitalCase(name),
      dashCaseName: camelToDashCase(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', capitalCase(name));
    }))
    .pipe(gulp.dest(destPath));

});
