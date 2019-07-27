const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DaySchema = require('./day.js');

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    days: [DaySchema],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
