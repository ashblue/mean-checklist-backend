import bluebird = require('bluebird');
import mongoose = require('mongoose');

const DB_SRC: string = 'mongodb://localhost/mean-checklist';

// @NOTE See here if MongoDB bombs out on OSX https://stackoverflow.com/questions/23418134/cannot-connect-to-mongodb-errno61-connection-refused
export class Database {
    constructor () {
        mongoose.Promise = bluebird;
        mongoose.connect(DB_SRC, {
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
    }
}
