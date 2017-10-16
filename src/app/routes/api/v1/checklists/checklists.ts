import * as express from 'express';
import { ctrlChecklists } from './../../../../controllers/index';

/**
 * @src https://expressjs.com/en/guide/routing.html#express-router
 */
class RouteChecklists {
    public router = express.Router();

    constructor () {
        this.router.get('/', ctrlChecklists.index);
        this.router.put('/create', ctrlChecklists.create);
        this.router.get('/:id', ctrlChecklists.get);
        this.router.put('/:id', ctrlChecklists.update);
        this.router.delete('/:id', ctrlChecklists.destroy);
    }
}

export const routeChecklists = new RouteChecklists();
