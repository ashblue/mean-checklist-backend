import * as express from 'express';
import { ctrlAuth } from './../../../../controllers/index';

class RouteUsers {
    public router = express.Router();

    constructor () {
        this.router.put('/login', ctrlAuth.login);
        this.router.put('/register', ctrlAuth.register);
    }
}

export const routeUsers = new RouteUsers();
