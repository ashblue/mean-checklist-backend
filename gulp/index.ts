import * as tasks from './tasks/index';

import gulp = require('gulp');

gulp.task('default', [
    'serve',
]);

// @TODO Move sequences to a special class type (similar to tasks)
gulp.task('build', [
    tasks.tslint.name,
    tasks.buildTypescript.name,
]);

gulp.task('serve', [
    tasks.taskDisableMocks.name,
    'build',
    tasks.server.name,
]);

gulp.task('serve-mocks', [
    tasks.taskEnableMocks.name,
    'build',
    tasks.server.name,
]);

gulp.task('watch', [
    tasks.taskDisableMocks.name,
    'build',
    tasks.serverWatch.name,
]);
