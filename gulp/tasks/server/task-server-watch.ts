import TaskBase from '../base/task-base';
import { buildTypescript } from '../build-typescript/task-build-typescript';

import cp = require('child_process');
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
        const n = nodemon({
            ext: 'ts',
            script: 'dist/src/index.js',
            watch: ['src/**/*.ts'],
        });

        // ***** Shims for gulp-nodemon/index.js - Adds support for Gulp flags *****
        // Submitted a ticket to get this fixed in the master gulp-nodemon repo, currently gulp tasks always fail since additional arguments can't be passed in
        // @src https://github.com/JacksonGariety/gulp-nodemon/issues/146
        n.on('restart', () => {
            cp.spawnSync('gulp', ['build', '--gulpfile', 'dist/gulp/index.js', '--cwd', '.'], {
                stdio: [0, 1, 2],
            });
        });

        return n;
    }
}

export let serverWatch = new TaskServerWatch();
