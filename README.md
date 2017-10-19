# MEAN Checklist - Backend

Mongo, Express, Angular 2+ and Node.js checklist application. This is the back-end of the app. Does
not include visual front-end (a separate repo found (here)[github.com]).

## Installation
1. Install (Node.js)[nodejs.org]
1. Install (MongoDB)[https://docs.mongodb.com/manual/installation/]
1. Clone this repo from GitHub into a local folder
1. Run `npm install` in the cloned repo folder's root

## Quick Start
1. Run `mongod` in a separate terminal window to enable the database
1. Run `npm run start`
1. Terminal should read that the back-end API is fully operational

Edits to content in the `src` folder will automatically rebuild. If you need to edit content in
`gulp`, cancel the current process then run `npm run start` to refresh the app's build pipeline.

## Testing

You can edit and view the entire postman testing suite [here](https://www.getpostman.com/collections/b6bfac28014b64df1d2b).

**WARNING**: Running tests will reset the active database.

1. `mongod` in a separate window to initialize the database
1. `npm run start` to run the server in a separate window
1. `npm run test` to run the tests. Run this command as many times as you would like
1. Results will be printed accordingly in the terminal

Testing is built on top of Postman's [Newman](https://github.com/postmanlabs/newman) package. If you want to learn more 
about and use Postman to update the tests, please see [here](https://www.getpostman.com/).

### Database Tasks

`npm run serve-db-new`: Boot up the server with a cleanly wiped database.

`npm run serve-db-mocks`: Create a new database with injected data mocks. Then run the server. For
a list of the generated mock accounts with password please see 
[here]((gulp/tasks/database/database-mocks.ts)).

