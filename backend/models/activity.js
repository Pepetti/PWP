/**
 * @file activity.js
 * @description Contains schema for an activity
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoincrement = require('mongoose-sequence')(mongoose);
//Activity contains routines
const RoutineSchema = require('./routine.js');

//Activity schema
const ActivitySchema = new Schema({
    aerobic: Boolean, //Boolean to see if the activity in question is an aerobic activity
    routines: [RoutineSchema], //Routines that were done during the activity
});

ActivitySchema.plugin(autoincrement, {inc_field: 'activityId'});

//Export the Schema
module.exports = ActivitySchema;
