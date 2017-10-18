import * as express from 'express';
import { ctrlChecklistTasks } from './../../../../controllers/index';

/**
 * @src https://expressjs.com/en/guide/routing.html#express-router
 */
class RouteChecklistTasks {
    public router = express.Router();

    constructor () {
        this.router.get('/:id/tasks/:idTask', ctrlChecklistTasks.get);
        this.router.put('/:id/tasks/create', ctrlChecklistTasks.create);
        this.router.put('/:id/tasks/:idTask', ctrlChecklistTasks.update);
        this.router.delete('/:id/tasks/:idTask', ctrlChecklistTasks.destroy);
    }
}

export const routeChecklistTasks = new RouteChecklistTasks();
