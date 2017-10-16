import * as express from 'express';
import { ctrlChecklistTasks } from './../../../../controllers/index';

/**
 * @src https://expressjs.com/en/guide/routing.html#express-router
 */
class RouteChecklistTasks {
    public router = express.Router();

    constructor () {
        this.router.put('/create', ctrlChecklistTasks.create);
        this.router.put('/:idTask', ctrlChecklistTasks.update);
        this.router.delete('/:idTask', ctrlChecklistTasks.destroy);
    }
}

export const routeChecklistTasks = new RouteChecklistTasks();
