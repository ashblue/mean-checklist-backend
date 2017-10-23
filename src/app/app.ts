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
        this.express.use(this.logRequests);
        this.express.use(ctrlAuth.passport.initialize());
        this.api = new RouteApi(this.express);

        this.express.use('/', express.static('public'));
        this.express.get('*', (req, res) => {
            res.sendfile('public/index.html');
        });
    }

    private logRequests (req, res, next) {
        console.log('Request', req.originalUrl, req.body);
        next();
    }
}

// Returns a singleton
export default new App();
