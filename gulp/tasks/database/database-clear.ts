import TaskBase from '../base/task-base';

import bluebird = require('bluebird');
import mongoose = require('mongoose');

class TaskDatabaseClear extends TaskBase {
    public dbSrc: string = 'mongodb://localhost/mean-checklist';

    get name (): string {
        return 'database-clear';
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

            mongoose.connection.db.dropDatabase((err) => {
                if (err) {
                    console.log(err);
                    callback();
                    return;
                }

                mongoose.connection.close((err) => {
                    if (err) {
                        console.log(err);
                        callback();
                        return;
                    }

                    callback();
                });
            });

        });
    }
}

export const databaseClear = new TaskDatabaseClear();
