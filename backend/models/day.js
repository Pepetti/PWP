/**
 * @file day.js
 * @description Contains the schema for day
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//A day contains activities
const ActivitySchema = require('./activity.js');

//The day schema
const DaySchema = new Schema({
    //Date in format "23062019" (ddmmyyyy). Days are unique
    date: {type: String, },
    activities: [ActivitySchema], //Day contains activities
});

//Export the day schema
module.exports = DaySchema;
