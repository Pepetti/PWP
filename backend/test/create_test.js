/**
 * @file create_test.js
 * @description Tests for create action to mongoDB
 */
const User = require('../models/user.js');
const assert = require('assert');
const generators = require('../generators');
const mongoose = require('mongoose');

describe('Creating documents', () => {
    //In this instance the User that we are creating already exists.
    it('creates user (to already populated database with the unique email field already in use)', done => {
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
                assert(!usr.isNew); //If user is not new, user was saved to database
                done();
            })
            .catch(err => {
                if (err.name === 'MongoError' && err.code === 11000) {
                    console.log('User already exists in the database!');
                    done();
                }
            });
    });
    //In this test we create a user to an empty database -->
    //We drop the users collection first
    it('creates a new user (drop first)', done => {
        mongoose.connection.collections.users.drop(); //Drop the user created by the helper
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
        usr.save().then(() => {
            assert(!usr.isNew); //If user is not new, user was saved to database
            done();
        });
    });
    //Creates a user with a field not included in the schema
    it('creates a user with a field no included in schema', done => {
        const usr = new User({
            firstName: 'Example',
            lastName: 'User2',
            email: 'example.user2@email.com',
            password: generators.generatePass('Test123123'),
            days: [],
            field1: 'This does not exist in schema',
            field2: 'Neither does this',
        });
        usr.save().then(doc => {
            assert(!usr.isNew);
            //Mongoose doesn't pass on the fields to mongodb that are not included
            //in the schema. If the fields requested are undefined, the test passes
            //since the fields are not in the database
            assert(doc.field1 === undefined);
            assert(doc.field2 === undefined);
            done();
        });
    });
});
