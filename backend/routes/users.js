/**
 * @file users.js
 * @description Contains routes for user functionality
 */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const withAuth = require('../config/cookieMiddleware');

//Login page
router.post('/login', (req, res) => {
    const {email, pass} = req.body;
    User.findOne({email: email}).then((user, err) => {
        if (err) {
            console.error(err);
            res.status(500).send({
                error: 'Internal error, please try again',
                validationError: false,
            });
        } else if (!user) {
            res.status(401).send({
                error: 'Incorrect email or password!',
                validationError: true,
            });
        } else {
            if (!bcrypt.compareSync(pass, user.password)) {
                res.status(401).send({error: 'Incorrect email or password!'});
            } else {
                const payload = {email};
                const token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: '1h',
                });
                res.cookie('token', token, {httpOnly: true}).sendStatus(200);
            }
        }
    });
});

//Login handle
router.get('/login', (req, res) => {
    console.log('jee');
});

//Register page
router.get('/register', (req, res) => {
    res.send('Register');
});

//Register handle
router.post('/register', (req, res) => {
    const {firstName, lastName, email, password, password2, email2} = req.body;
    const errors = [];
    if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !password2 ||
        !email2
    ) {
        res.status(500).send({
            error:
                'Missing parameters, please fill out all the required fields',
        });
    } else {
        if (!email.includes('@')) {
            errors.push({
                error: 'Not a valid email!',
                validationError: true,
            });
        }
        if (email !== email2) {
            errors.push({
                error: "Emails don't match!",
                validationError: true,
            });
        }
        if (password !== password2) {
            errors.push({
                error: "Passwords don't match!",
                validationError: true,
            });
        }
        if (password.length < 6) {
            errors.push({
                error: 'Password needs to be 6 characters or more!',
                validationError: true,
            });
        }

        if (errors.length !== 0) {
            res.status(400).send({errors: errors, validationError: true});
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
                            res.status(200).send({msg: 'registered'});
                        })
                        .catch(err => {
                            if (
                                err.type === 'MongoError' &&
                                err.code === 11000
                            ) {
                                errors.push({
                                    error:
                                        'User already registered with this email!',
                                    validationError: true,
                                });
                                res.status(400).send({
                                    errors: errors,
                                });
                            } else {
                                errors = [];
                                errors.push({
                                    errors: 'Internal error. Try again.',
                                    validationError: false,
                                });
                                console.log('ERROR: ', err);
                                res.status(500).send({
                                    errors: errors,
                                    validationError: false,
                                });
                            }
                        });
                } else {
                    errors.push({
                        error: 'User already registered with this email!',
                    });
                    res.status(400).send({
                        errors: errors,
                        validationError: true,
                    });
                }
            });
        }
    }
});

//Dashboard
router.get('/users/dashboard', withAuth, (req, res) => {
    res.send('got ze zegret');
});

module.exports = router;
