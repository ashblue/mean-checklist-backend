import TaskBase from '../base/task-base';

class TaskDisableMocks extends TaskBase {
    get name (): string {
        return 'node-variable-disable-mocks';
    }

    public logic (callback: any) {
        process.env.DB_MOCKS = 'false';

        callback();
    }
}

export let taskDisableMocks = new TaskDisableMocks();
