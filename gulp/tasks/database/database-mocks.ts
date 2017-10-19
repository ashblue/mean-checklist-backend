import TaskBase from '../base/task-base';
import { databaseClear } from './database-clear';

import bluebird = require('bluebird');
import mongoose = require('mongoose');

class TaskDatabaseMocks extends TaskBase {
    public dbSrc: string = 'mongodb://localhost/mean-checklist';

    get dependencies (): string[] {
        return [databaseClear.name];
    }

    get name (): string {
        return 'database-mocks';
    }

    public logic (callback: any) {
        mongoose.Promise = bluebird;
        mongoose.connect(this.dbSrc, {
            useMongoClient: true,
        }, (err) => {
            if (err) {
                console.log(err);
                callback();
                return;
            }

            // @TODO Logic goes here for creating the mock data, this should be called as a callback
            mongoose.connection.close((err) => {
                if (err) {
                    console.log(err);
                    callback();
                    return;
                }

                callback();
            });
        });
    }
}

export const databaseMocks = new TaskDatabaseMocks();
