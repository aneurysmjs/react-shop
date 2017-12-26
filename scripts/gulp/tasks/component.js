'use strict';

import 'babel-register';

import gulp from 'gulp';
import {join} from 'path';
import rename from 'gulp-rename';
import template from 'gulp-template';
import yargs from 'yargs';

import {
  resolveFolderPath,
  capitalCase,
  camelToDashCase,
  componentPath
} from '../../utils/utils';

gulp.task('component', () => {

  // extract the arguments that was given in the CLI
  let name = yargs.argv.name,
    parentPath = yargs.argv.parent || '',
    folder = yargs.argv.folder || 'components',
    destPath = join(resolveFolderPath(folder), parentPath, capitalCase(name));

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