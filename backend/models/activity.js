const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoutineSchema = require('./routine.js');

const ActivitySchema = new Schema({
    aerobic: Boolean,
    routines: [RoutineSchema],
});

module.exports = ActivitySchema;
