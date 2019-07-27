require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/user');

const generatePass = a => {
    let h = bcrypt.hashSync(a, 10);
    return h;
};

const getTime = () => {
    const d_ = new Date();
    const d = d_.getDate().toString();
    const m = (d_.getMonth() + 1).toString();
    const y = d_.getFullYear().toString();
    const date = d + m + y;
    return date;
};

const url = process.env.MONGODB_URI;

mongoose.connect(url, {useNewUrlParser: true});

User.update(
    {email: 'oskari.kotajarvi@gmail.com'},
    {$push: {days: {date: getTime(), activities: []}}},
).then(doc => {
    console.log(doc);
});
