import { Database } from './controllers/databases/databases';

class App {
    public database: Database;

    constructor () {
        this.database = new Database();
    }
}

// Returns a singleton
export default new App();
