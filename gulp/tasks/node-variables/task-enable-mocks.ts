import TaskBase from '../base/task-base';

class TaskEnableMocks extends TaskBase {
    get name (): string {
        return 'node-variable-enable-mocks';
    }

    public logic (callback: any) {
        process.env.DB_MOCKS = 'true';

        callback();
    }
}

export let taskEnableMocks = new TaskEnableMocks();
