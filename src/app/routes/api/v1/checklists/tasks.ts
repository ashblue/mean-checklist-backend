import * as express from 'express';
import { ctrlAuth, ctrlChecklistTasks } from './../../../../controllers/index';

/**
 * @src https://expressjs.com/en/guide/routing.html#express-router
 */
class RouteChecklistTasks {
    public router = express.Router();

    constructor () {
        this.router.get('/:id/tasks/:idTask', ctrlAuth.authenticate(), ctrlChecklistTasks.get);
        this.router.put('/:id/tasks/create', ctrlAuth.authenticate(), ctrlChecklistTasks.create);
        this.router.put('/:id/tasks/:idTask', ctrlAuth.authenticate(), ctrlChecklistTasks.update);
        this.router.delete('/:id/tasks/:idTask', ctrlAuth.authenticate(), ctrlChecklistTasks.destroy);
    }
}

export const routeChecklistTasks = new RouteChecklistTasks();
