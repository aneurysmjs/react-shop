'use strict';

import '@babel/register';

import gulp from 'gulp';
import path from 'path';
import rename from 'gulp-rename';

const ROOT = path.resolve(__dirname, '../../..'); // Movie-search

gulp.task('rename', () => {

  return gulp.src(path.join(ROOT + '../src/shared/components/**/*.**'))

    .pipe(rename((pathObj) => {
      console.log('pathObj', pathObj);
      // pathObj.basename = pathObj.basename.replace('temp', capitalCase(name));
      pathObj.basename = pathObj.basename.replace('Rm', '');
    }))
    .pipe(gulp.dest(path.join(ROOT + 'sisa')));

});