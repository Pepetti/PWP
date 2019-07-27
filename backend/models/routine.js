const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
    sets: [],
    reps: Number,
    type: String,
});

module.exports = RoutineSchema;
