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
    firstName: {type: String, required: true}, //First name of the user
    lastName: {type: String, required: true}, //Last name of the user
    email: {type: String, unique: true, requried: true, dropDups: true}, //User email -- unique
    password: {type: String, required: true}, //Password for the user. Asked upon login
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
