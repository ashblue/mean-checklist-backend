import TaskBase from '../base/task-base';
import { buildTypescript } from '../build-typescript/task-build-typescript';

import nodemon = require('gulp-nodemon');

class TaskServerWatch extends TaskBase {
    get dependencies (): string[] {
        return [buildTypescript.name];
    }

    get name (): string {
        return 'server-watch';
    }

    // @TODO Must be re-written with vanilla Nodemon (Gulp Nodemon is broken)
    public logic (callback: any) {
        return nodemon({
            ext: 'ts',
            script: 'dist/src/index.js',
            tasks: [buildTypescript.name],
            watch: ['src/**/*.ts'],
        });
    }
}

export let serverWatch = new TaskServerWatch();
