import * as express from 'express';
import { ctrlAuth, ctrlChecklists } from './../../../../controllers/index';

/**
 * @src https://expressjs.com/en/guide/routing.html#express-router
 */
class RouteChecklists {
    public router = express.Router();

    constructor () {
        this.router.get('/', ctrlAuth.authenticate(), ctrlChecklists.index);
        this.router.put('/create', ctrlAuth.authenticate(), ctrlChecklists.create);
        this.router.get('/:id', ctrlAuth.authenticate(), ctrlChecklists.get);
        this.router.put('/:id', ctrlAuth.authenticate(), ctrlChecklists.update);
        this.router.delete('/:id', ctrlAuth.authenticate(), ctrlChecklists.destroy);
    }
}

export const routeChecklists = new RouteChecklists();
