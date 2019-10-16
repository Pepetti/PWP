# Backend documentation

## Final documentation
### Dependencies
To run the tests and the app itself you will have to install nodeJS to your machine. Instructions on how to install nodeJS to your
machine can be found on node [website](https://nodejs.org/en/)

The dependencies needed for the backend are available in the package.json file. To install all the dependencies run `npm i` or `npm install` at the backend root directory.
This will install all dependencies for you.

Dependencies at the time of final delivery include:
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Mongoose-sequence](https://www.npmjs.com/package/mongoose-sequence)
- [Express](https://www.npmjs.com/package/express)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [Body parser](https://www.npmjs.com/package/body-parser)
- [Mocha](https://www.npmjs.com/package/mocha) (a dev-dependency for testing)
- [Supertest](https://www.npmjs.com/package/supertest) (a dev-dependency for testing)

### Database and version used
This application uses the latest version of [MongoDB](https://www.mongodb.com/). The latest version of MongoDB is 4.0 at the time
of writing this.

### Database setup
To setup the MongoDB database, please refer to the official [getting started](https://docs.atlas.mongodb.com/getting-started/) guide
from MongoDB. Keep in mind that you have to name your database as _SportsTracker_.

After this you have to create a `.env` file to the backend root directory. The file has to contain the following:
```javascript
MONGODB_URI=<your mongodb connect url here>
PORT=<The port you want to run the application on>
```
If you want to populate the database with example data, you can run the `populate.js` file located in the _DL2_ directory. Keep in mind that if you run the tests after that, the database will be left empty after the tests.

### Running the backend application
To run the backend application you can run `node index.js` in the backend directory. If you have nodemon installed on your machine you can run the backend via `nodemon index.js`. Nodemon can be installed via npm with `npm i nodemon -g`.

### Testing
At this point you propably already have ran the comman `npm install` which installs all dependencies for the application.
After this you can run all tests with the command `npm test`. Other commands include (and give more information of the tests):
- `npm run api_test` runs the tests for the API
- `npm run create_test` runs the tests for database in the scope of CREATE
- `npm run delete_test` runs the tests for database in the scope of DELETE
- `npm run read_test` runs the tests for the database in the scope of READ
- `npm run update_test` runs the tests for the database in the scope of UPDATE

Keep in mind that there are 50 different tests and it takes around 15-30 seconds to run them all with `npm test`
All code for the tests can be found in the `test` directory.
