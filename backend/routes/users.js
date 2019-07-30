/**
 * @file users.js
 * @description Contains routes for user functionality
 */

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

//Login page
router.get('/login', (req, res) => {
    res.send('Login');
});

//Login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
    })(req, res, next);
});

//Register page
router.get('/register', (req, res) => {
    res.send('Register');
});

//Register handle
router.post('/register', (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    if (!firstName || !lastName || !email || !password) {
        res.status(400).send({
            error:
                'Missing parameters, please fill out all the required fields',
        });
    } else {
        User.findOne({email: email}).then(user => {
            if (user === null) {
                const hash = bcrypt.hashSync(password, 13);
                const newUser = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email.toLowerCase(),
                    password: hash,
                    days: [],
                });
                newUser
                    .save()
                    .then(() => {
                        res.redirect('/users/login');
                    })
                    .catch(err => {
                        if (err.type === 'MongoError' && err.code === 11000) {
                            res.status(400).send({
                                error: 'User already exists',
                            });
                        } else {
                            res.status(500).send({error: err});
                        }
                    });
            } else {
                res.status(400).send({error: 'Email already registered'});
            }
        });
    }
});

module.exports = router;
