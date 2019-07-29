/**
 * @file routine.js
 * @description Contains the schema for a routine
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoincrement = require('mongoose-sequence')(mongoose);

//Routine schema
const RoutineSchema = new Schema({
    sets: [], //Sets as object. Contains {weight: 20} for example
    reps: Number, //Number of reps in set
    type: String, //Type of the routine. For example "deadlift"
});

RoutineSchema.plugin(autoincrement, {inc_field: 'routineId'});

//Exports the routine schema
module.exports = RoutineSchema;
