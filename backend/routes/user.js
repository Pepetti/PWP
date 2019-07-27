const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.js');

//Get user information
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(doc => {
            res.status(200).json(doc);
            console.log('response sent');
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});
