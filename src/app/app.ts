import * as express from 'express';
import { Database } from './controllers/databases/databases';

import bodyParser = require('body-parser');

class App {
    public express: express.Application;
    public database: Database;

    constructor () {
        this.database = new Database();

        this.express = express();
        this.express.use(bodyParser.json());
    }
}

// Returns a singleton
export default new App();
