const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const tslint = require('gulp-tslint');

const DELETE_FOLDER = 'dist';
const TS_CONFIG = 'tsconfig.json';
const SOURCE = 'gulp/**/*.ts';
const DESTINATION = 'dist/gulp';

gulp.task('delete-folder', () => {
    return del(DELETE_FOLDER);
});

gulp.task('tslint', () => {
    return gulp.src("gulp/**/*.ts")
        .pipe(tslint())
        .pipe(tslint.report({
            emitError: false
        }));
});

/**
 * Used to generate the initial bootstrap files from TypeScript via command line
 */
gulp.task('create-gulp', ['delete-folder', 'tslint'], () => {
    const tsProject = ts.createProject(TS_CONFIG);

    return gulp.src(SOURCE)
        .pipe(tsProject())
        .js.pipe(gulp.dest(DESTINATION));
});

gulp.task('default', ['delete-folder', 'create-gulp']);
