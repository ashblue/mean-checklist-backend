import * as express from 'express';
import {RouteV1} from './v1/v1';

const routeName = 'api';

export class RouteApi {
    public v1: RouteV1;

    constructor (app: express.Application) {
        this.v1 = new RouteV1(`/${routeName}`, app);
    }
}
