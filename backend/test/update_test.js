/**
 * @file update_test.js
 * @description Test to update a user in mongoDB
 */

const assert = require('assert');
const User = require('../models/user');
const generators = require('../generators');

describe('Update a user', () => {
    //Add a new "day" for user
    it('adds a new day for user', done => {
        User.findOne({email: 'example.user1@email.com'}).then(user => {
            const newDay = {
                date: '211095',
                activities: [],
            };
            user.days.push(newDay);
            user.save().then(() => {
                User.findOne({email: 'example.user1@email.com'}).then(
                    result => {
                        assert(result.days.length === 2);
                        done();
                    },
                );
            });
        });
    });
    //Adds a new activity for a day
    it('adds a new activity for a day', done => {
        User.findOne({email: 'example.user1@email.com'})
            .where({'days.date': generators.getTime()})
            .then(user => {
                const newDay = user.days[0];
                const newActivity = {
                    aerobic: false,
                    routines: [],
                };
                newDay.activities.push(newActivity);
                user.days.map(day => {
                    day.date === generators.getTime() ? (day = newDay) : null;
                });
                user.save().then(() => {
                    User.findOne({email: 'example.user1@email.com'})
                        .where({'days.date': generators.getTime()})
                        .then(user => {
                            assert(user.days[0].activities.length === 2);
                            done();
                        });
                });
            });
    });
    //Adds a new routine to an activity
    it('adds a new routine to a activity', done => {
        User.findOne({email: 'example.user1@email.com'})
            .where({'days.date': generators.getTime()})
            .then(user => {
                newRoutine = {
                    sets: [{weight: 10}],
                    reps: 5,
                    type: 'TestType',
                };
                user.days[0].activities[0].routines.push(newRoutine);
                user.save().then(() => {
                    User.findOne({email: 'example.user1@email.com'}).then(
                        user => {
                            assert(
                                user.days[0].activities[0].routines.length ===
                                    3,
                            );
                            done();
                        },
                    );
                });
            });
    });
    //Modify a routine by changing the amount of reps and add a set
    it('update a routine', done => {
        User.findOne({email: 'example.user1@email.com'})
            .where({'days.date': generators.getTime()})
            .then(user => {
                newRoutine = user.days[0].activities[0].routines[0];
                newRoutine.sets.push({weight: 33});
                newRoutine.reps = 12;
                user.days[0].activities[0].routines.map(routine => {
                    routine._id === newRoutine._id
                        ? (routine = newRoutine)
                        : null;
                });
                user.save().then(() => {
                    User.findOne({email: 'example.user1@email.com'}).then(
                        user => {
                            routine = user.days[0].activities[0].routines[0];
                            assert(routine.reps === 12);
                            assert(routine.sets.length === 4);
                            done();
                        },
                    );
                });
            });
    });
});
