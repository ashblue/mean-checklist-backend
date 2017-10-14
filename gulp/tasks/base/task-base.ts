import gulp = require('gulp');

abstract class TaskBase {
    abstract get name (): string;
    get dependencies (): string[] {
        return [];
    }

    constructor () {
        gulp.task(this.name, this.dependencies, this.logic);
    }

    public abstract logic (callback): any;
}

export default TaskBase;
