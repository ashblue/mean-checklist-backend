import gulp = require('gulp');
import ts = require('gulp-typescript');
import TaskBase from '../base/task-base';

const TS_SRC: string = 'tsconfig.json';
const TS_PROJECT: any = ts.createProject(TS_SRC);
const OUTPUT: string = 'dist/src';

class TaskBuildTypescript extends TaskBase {
    get name (): string {
        return 'typescript';
    }

    public logic (callback: any) {
        return TS_PROJECT.src()
            .pipe(TS_PROJECT())
            .js.pipe(gulp.dest(OUTPUT));
    }
}

export let buildTypescript = new TaskBuildTypescript();
