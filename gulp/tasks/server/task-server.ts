import TaskBase from '../base/task-base';
import { buildTypescript } from '../build-typescript/task-build-typescript';

import nodemon = require('gulp-nodemon');

class TaskServer extends TaskBase {
    get dependencies (): string[] {
        return [buildTypescript.name];
    }

    get name (): string {
        return 'server';
    }

    public logic (callback: any) {
        return nodemon({
            script: 'dist/src/index.js',
        });
    }
}

export let server = new TaskServer();
