import * as express from 'express';
import { ctrlAuth, Database } from './controllers/index';
import { RouteApi } from './routes/index';

import bodyParser = require('body-parser');

class App {
    public express: express.Application;
    public database: Database;
    public api: RouteApi;

    constructor () {
        this.database = new Database();

        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(ctrlAuth.passport.initialize());
        this.api = new RouteApi(this.express);
    }
}

// Returns a singleton
export default new App();
