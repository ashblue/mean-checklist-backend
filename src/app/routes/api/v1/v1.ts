import * as express from 'express';
import { routeChecklists, routeChecklistTasks } from './checklists/index';

const routeName = 'v1';

export class RouteV1 {
    constructor (prefix: string, app: express.Application) {
        app.use(`${prefix}/${routeName}/checklists`, routeChecklists.router);
        app.use(`${prefix}/${routeName}/checklists`, routeChecklistTasks.router);
    }
}
