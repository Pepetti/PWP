/**
 * @file create_test.js
 * @description Tests for create action to mongoDB
 */
const User = require('../models/user.js');
const assert = require('assert');
const generators = require('../generators');
const mongoose = require('mongoose');

describe('Creating documents', () => {
    it('creates user', done => {
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
});
