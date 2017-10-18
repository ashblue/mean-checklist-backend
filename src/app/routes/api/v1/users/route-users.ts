import * as express from 'express';
import { ctrlAuth } from './../../../../controllers/index';

class RouteUsers {
    public router = express.Router();

    constructor () {
        this.router.get('/login', ctrlAuth.login);
        this.router.get('/register', ctrlAuth.register);
    }
}

export const routeUsers = new RouteUsers();
