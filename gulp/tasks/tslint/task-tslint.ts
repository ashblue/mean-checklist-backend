import tsLint from 'gulp-tslint';
import TaskBase from '../base/task-base';

import gulp = require('gulp');

class TaskTslint extends TaskBase {
    get name (): string {
        return 'tslint';
    }

    public logic (callback: any) {
        return gulp.src('src/**/*.ts')
            .pipe(tsLint())
            .pipe(tsLint.report({
                emitError: false,
            }));
    }
}

export let tslint = new TaskTslint();
