require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user.js');

const app = express();

app.use(bodyParser.json());

const url = process.env.MONGODB_URI;
mongoose.connect(url, {useNewUrlParser: true}).then(result => {
    console.log('Connected to mongo');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
