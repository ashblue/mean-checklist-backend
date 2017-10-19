import * as tasks from './tasks/index';

import gulp = require('gulp');

// @TODO Move sequences to a special class type (similar to tasks)

gulp.task('default', [
    'serve',
]);

gulp.task('build', [
    tasks.tslint.name,
    tasks.buildTypescript.name,
]);

gulp.task('serve', [
    'build',
    tasks.server.name,
]);

gulp.task('watch', [
    'build',
    tasks.serverWatch.name,
]);

// ***** Database commands
gulp.task('serve-db-new', [
    tasks.databaseClear.name,
    tasks.serverDatabaseClear.name,
]);

gulp.task('serve-db-mocks', [
    tasks.databaseClear.name,
    tasks.databaseMocks.name,
    tasks.serverDatabaseMocks.name,
]);
