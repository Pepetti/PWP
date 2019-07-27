require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.js');

const url = process.env.MONGODB_URI;

const getTime = () => {
    const d_ = new Date();
    const d = d_.getDate().toString();
    const m = (d_.getMonth() + 1).toString();
    const y = d_.getFullYear().toString();
    const date = d + m + y;
    return date;
};

mongoose.connect(url, {useNewUrlParser: true}).then(result => {
    console.log('Connected to mongo');
});

User.find({_id: '5d38e1a35aec936fd5f25c21'})
    .where({'days.date': '2572019'})
    .then(doc => {
        console.log(doc[0].days[0].activities[0]);
    });

User.update(
    {email: 'prikkapekka@gmail.com'},
    {
        email: 'pirkkapekka@gmail.com',
    },
).then(doc => {
    console.log(doc);
});

//var pat = new User({
//firstName: 'Oskari',
//lastName: 'Kotajärvi',
//email: 'oskari.kotajarvi@gmail.com',
//days: [
//{
//date: getTime(),
//activities: [
//{
//aerobic: false,
//routines: [
//{
//sets: [{weight: 20}, {weight: 30}, {weight: 40}],
//reps: 10,
//type: 'Pullup',
//},
//{
//sets: [{weight: 10}, {weight: 20}, {weight: 30}],
//reps: 5,
//type: 'Squat',
//},
//],
//},
//],
//},
//],
//options: {upsert: true},
//});

//var pp = new User({
//firstName: 'Pirkka-Pekka',
//lastName: 'Launonen',
//email: 'prikkapekka@gmail.com',
//days: [
//{
//date: new Date(),
//activities: [
//{
//aerobic: false,
//routines: [
//{
//sets: [{weight: 10}],
//reps: 1,
//type: 'Lift',
//},
//{
//sets: [{weight: 15}],
//reps: 2,
//type: 'Deadlift',
//},
//],
//},
//{
//aerobic: true,
//routines: [
//{
//sets: [],
//reps: 0,
//type: 'Jog',
//},
//],
//},
//],
//},
//],
//});

//pat.save().then(result => {
//console.log('User saved!');
//mongoose.connection.close();
//});
