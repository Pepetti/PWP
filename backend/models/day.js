const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ActivitySchema = require('./activity.js');

const DaySchema = new Schema({
    date: String,
    activities: [ActivitySchema],
});

module.exports = DaySchema;
