/**
 * @file populate.js
 * @description Populates the mongoDB database with example data,
 * if not done in the website
 */

require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

/**
 * Password generation.
 *
 * Generates a hashed password from the given string.
 *
 * @param String    a   Given password as string
 *
 * @returns String   Hashed password
 */

const generatePass = a => {
    let h = bcrypt.hashSync(a, 10);
    return h;
};

/**
 * getTime
 *
 * Creates the time as a formatted string for the db
 *
 * @returns String  Returns the date as a string formatted mmddyyyy
 */

const getTime = () => {
    const d_ = new Date();
    const d = d_.getDate().toString();
    const m = (d_.getMonth() + 1).toString();
    const y = d_.getFullYear().toString();
    const date = d + m + y;
    return date;
};

//Connect to the mongo database
const url = process.env.MONGODB_URI;
mongoose
    .connect(url, {useNewUrlParser: true})
    .then(result => {
        console.log('Connected');
    })
    .catch(err => {
        console.log('Error on connect');
        console.log(err);
    });

//Check if the database is already populated with the example data,
//if not, populate it with the example data
User.find({email: 'example.user1@email.com'}).then(doc => {
    if (doc.length === 1) {
        console.log('The database is already populated with the example data');
        mongoose.connection.close();
    } else {
        var example1 = new User({
            firstName: 'Example',
            lastName: 'User1',
            email: 'example.user1@email.com',
            password: generatePass('example1'),
            days: [
                {
                    date: getTime(),
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

        var example2 = new User({
            firstName: 'Example',
            lastName: 'User2',
            email: 'example.user2@email.com',
            password: generatePass('example2'),
            days: [
                {
                    date: new Date(),
                    activities: [
                        {
                            aerobic: false,
                            routines: [
                                {
                                    sets: [{weight: 10}],
                                    reps: 1,
                                    type: 'Lift',
                                },
                                {
                                    sets: [{weight: 15}],
                                    reps: 2,
                                    type: 'Deadlift',
                                },
                            ],
                        },
                        {
                            aerobic: true,
                            routines: [
                                {
                                    sets: [],
                                    reps: 0,
                                    type: 'Jog',
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        example1
            .save()
            .then(result => {
                console.log('Example user 1 added to database');
            })
            .then(() => {
                example2.save().then(result => {
                    console.log('Example user 2 added to database');
                    mongoose.connection.close();
                });
            });

        //example2.save().then(result => {
        //console.log('Example user 2 added to database');
        //});
    }
});
