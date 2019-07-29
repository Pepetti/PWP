# Backend documentation

## DL2 documentation
### Dependencies
To run the tests and the app itself you will have to install nodeJS to your machine. Instructions on how to install nodeJS to your
machine can be found on node [website](https://nodejs.org/en/)

The dependencies needed for the backend are available in the package.json file. To install all the dependencies run `npm i` or `npm install` at the backend root directory.
This will install all dependencies for you.

Dependencies at the time of DL2 include:
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Mongoose-sequence](https://www.npmjs.com/package/mongoose-sequence)
- [Express](https://www.npmjs.com/package/express)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Mocha](https://www.npmjs.com/package/mocha) (a dev-dependency for testing)

### Database and version used
This application uses the latest version of [MongoDB](https://www.mongodb.com/). The latest version of MongoDB is 4.0 at the time
of writing this.

### Database setup
To setup the MongoDB database, please refer to the official [getting started](https://docs.atlas.mongodb.com/getting-started/) guide
from MongoDB. Keep in mind that you have to name your database as _SportsTracker_.

After this you have to create a `.env` file to the backend root directory. The file has to contain the following:
```javascript
MONGODB_URI=<your mongodb connect url here>
PORT=<The port you want to run the application on> //Not yet in use
```
