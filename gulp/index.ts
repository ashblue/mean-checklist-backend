import * as tasks from './tasks/index';

import gulp = require('gulp');

// @TODO Move sequences to a special class type (similar to tasks)
gulp.task('build', [
    tasks.tslint.name,
    tasks.buildTypescript.name,
]);

gulp.task('default', [
    'build',
    tasks.server.name,
]);

gulp.task('watch', [
    'build',
    tasks.serverWatch.name,
]);
