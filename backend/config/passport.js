/**
 * @file passport.js
 * @description Config for authentication
 */

const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = passport => {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            //Match user
            User.findOne({email: email})
                .then(user => {
                    if (!user) {
                        return done(null, false, {
                            message: 'Incorrect email or password',
                        });
                    } else {
                        //Match password
                        bcrypt.compareSync(
                            password,
                            user.password,
                            (err, isMatch) => {
                                if (err) throw err;
                                if (isMatch) {
                                    return done(null, user);
                                } else {
                                    done(null, false, {
                                        message: 'Incorrect email or password',
                                    });
                                }
                            },
                        );
                    }
                })
                .catch(err => console.log(err));
        }),
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
