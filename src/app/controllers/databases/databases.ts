import bluebird = require('bluebird');
import faker = require('faker');
import mongoose = require('mongoose');

import { ModelUser } from '../../models/user/model-user';
import { mockUsers } from './mocks/mock-users';
import { ModelChecklist } from '../../models/checklist/checklist';
import { ModelTask } from '../../models/task/task';

const DB_SRC: string = 'mongodb://localhost/mean-checklist';
const DB_HEROKU = process.env.MONGODB_URI;

// @NOTE See here if MongoDB bombs out on OSX https://stackoverflow.com/questions/23418134/cannot-connect-to-mongodb-errno61-connection-refused
export class Database {
    get dbConnection (): string {
        if (!DB_HEROKU || DB_HEROKU === '') {
            return DB_SRC;
        }

        return DB_HEROKU;
    }

    constructor () {
        mongoose.Promise = bluebird;
        mongoose.connect(this.dbConnection, {
            useMongoClient: true,
        });

        const connection = mongoose.connection;
        connection.on('error', console.error.bind(console, 'connection error:'));

        connection.on('open', () => {
            console.log(`Successfully connected to MongoDB: ${DB_SRC}`);
        });

        connection.on('close', () => {
            console.log(`Closed connection to MongoDB: ${DB_SRC}`);
        });

        console.log('Mocks enabled:', this.hasDbMocks());

        if (this.hasDbMocks()) {
            console.log('Creating mocks');
            this.createMocks();
        }
    }

    public hasDbMocks (): boolean {
        return process.env.DB_MOCKS === 'true';
    }

    private createMocks () {
        ModelUser.create(mockUsers, (err, users) => {
            if (err) {
                console.log(err);
                return;
            }

            if (!users || users.length !== mockUsers.length) {
                console.log('Users failed to generate properly');
                return;
            }

            users.forEach((user) => {
                const mockChecklists: any = [];
                for (let i = 0, l = this.getRandomInt(1, 20); i < l; i++) {
                    mockChecklists.push({
                        createdAt: faker.date.past(),
                        owner: user._id,
                        title: faker.lorem.words(),
                    });
                }

                ModelChecklist.create(mockChecklists, (err, checklists) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (!checklists || checklists.length !== mockChecklists.length) {
                        console.log('Checklists failed to generate properly');
                        return;
                    }

                    checklists.forEach((checklist) => {
                        const mockTasks: any = [];
                        for (let i = 0, l = this.getRandomInt(1, 20); i < l; i++) {
                            mockTasks.push({
                                createdAt: faker.date.past(),
                                owner: user._id,
                                title: faker.lorem.words(),
                                complete: faker.random.boolean(),
                            });
                        }

                        this.createTasks(checklist, mockTasks);
                    });
                });
            });
        });
    }

    private createTasks (checklist: any, mockTasks: any) {
        ModelTask.create(mockTasks, (err, tasks) => {
            if (err) {
                console.log(err);
                return;
            }

            if (!tasks || tasks.length !== mockTasks.length) {
                console.log('Tasks failed to generate properly');
                return;
            }

            const taskIds = tasks.map((t) => {
                return t._id;
            });

            checklist.update({tasks: taskIds}, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
        });
    }

    /**
     * @src https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
     * @param min
     * @param max
     * @returns {number}
     */
    private getRandomInt (min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
