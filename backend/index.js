/**
 * @file index.js
 * @description index file for the app
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');

const app = express();

//Cookie parser
app.use(cookieparser());

//Bodyparser
app.use(bodyparser.json());

//Routes
app.use('/users', require('./routes/users'));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
