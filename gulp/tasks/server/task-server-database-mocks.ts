import { buildTypescript } from '../build-typescript/task-build-typescript';
import { databaseClear } from '../database/database-clear';
import { databaseMocks } from '../database/database-mocks';
import { TaskServer } from './task-server';

/**
 * Same as TaskServer except additional dependencies. Required due to no synchronous Gulp execution.
 * @TODO Remove when Gulp 4 is stable (should allow for synchronous execution)
 */
class TaskServerDatabaseMocks extends TaskServer {
    get dependencies (): string[] {
        return [buildTypescript.name, databaseClear.name, databaseMocks.name];
    }

    get name (): string {
        return 'server-database-mocks';
    }
}

export const serverDatabaseMocks = new TaskServerDatabaseMocks();
