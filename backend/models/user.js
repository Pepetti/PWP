/**
 * @file user.js
 * @description Contains the schema for User
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//User has days
const DaySchema = require('./day.js');

//Schema for use
const UserSchema = new Schema({
    firstName: String, //First name of the user
    lastName: String, //Last name of the user
    email: String, //User email -- unique
    password: String, //Password for the user. Asked upon login
    days: [DaySchema], //Days
});

/**
 * User is the only schema that is used as a model.
 * All other schemas are contained inside the user document as
 * sub-documents
 */

const User = mongoose.model('User', UserSchema);

//Export User moodel
module.exports = User;
