import * as express from 'express';
import { checklistsCtrl } from './../../../../controllers/index';

/**
 * @src https://expressjs.com/en/guide/routing.html#express-router
 */
class RouteChecklists {
    public router = express.Router();

    constructor () {
        this.router.get('/', checklistsCtrl.index);
        this.router.post('/create', checklistsCtrl.create);
        this.router.get('/:id', checklistsCtrl.get);
        this.router.put('/:id', checklistsCtrl.update);
        this.router.delete('/:id', checklistsCtrl.destroy);
    }
}

export const routeChecklists = new RouteChecklists();
