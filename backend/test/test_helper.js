/**
 * @file test_helper.js
 * @description Connects mocha to mongoose and resets the db before each test
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');
const generators = require('../generators');
const autoincrement = require('mongoose-sequence')(mongoose);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
mongoose.connection
    .once('open', () => console.log('Connected'))
    .on('error', error => {
        console.warn('Error: ', error);
    });

//Hook to run before any test
beforeEach(done => {
    console.log('Creating new user before test...');
    const usr = new User({
        firstName: 'Example',
        lastName: 'User1',
        email: 'example.user1@email.com',
        password: generators.generatePass('example1'),
        days: [
            {
                date: generators.getTime(),
                activities: [
                    {
                        aerobic: false,
                        routines: [
                            {
                                sets: [
                                    {weight: 20},
                                    {weight: 30},
                                    {weight: 40},
                                ],
                                reps: 10,
                                type: 'Pullup',
                            },
                            {
                                sets: [
                                    {weight: 10},
                                    {weight: 20},
                                    {weight: 30},
                                ],
                                reps: 5,
                                type: 'Squat',
                            },
                        ],
                    },
                ],
            },
        ],
    });
    usr.save()
        .then(() => {
            console.log('New user created...');
            done();
        })
        .catch(err => {
            console.log(
                'Error while saving test user to database. Error: ',
                err,
            );
            done();
        });
});

//Hook to run after any test
afterEach(done => {
    console.log('Dropping user after test...');
    mongoose.connection.collections.users.drop(() => {
        console.log('User dropped after test...');
        done();
    });
});
