/**
 * @file update_test.js
 * @description Test to update a user in mongoDB
 */

const assert = require("assert");
const User = require("../models/user");
const generators = require("../generators");

describe("Update_test", () => {
  //Add a new "day" for user
  it("adds a new day for user", done => {
    User.findOne({ email: "example.user1@email.com" }).then(user => {
      const newDay = {
        date: "211095",
        activities: []
      };
      user.days.push(newDay);
      user.save().then(() => {
        User.findOne({ email: "example.user1@email.com" }).then(result => {
          assert(result.days.length === 2);
          done();
        });
      });
    });
  });
  //Adds a new activity for a day
  it("adds a new activity for a day", done => {
    User.findOne({ email: "example.user1@email.com" })
      .where({ "days.date": generators.getTime() })
      .then(user => {
        const newDay = user.days[0];
        const newActivity = {
          aerobic: false,
          routines: []
        };
        newDay.activities.push(newActivity);
        user.days.map(day => {
          day.date === generators.getTime() ? (day = newDay) : null;
        });
        user.save().then(() => {
          User.findOne({ email: "example.user1@email.com" })
            .where({ "days.date": generators.getTime() })
            .then(user => {
              assert(user.days[0].activities.length === 2);
              done();
            });
        });
      });
  });
  //Adds a new routine to an activity
  it("adds a new routine to a activity", done => {
    User.findOne({ email: "example.user1@email.com" })
      .where({ "days.date": generators.getTime() })
      .then(user => {
        newRoutine = {
          sets: [{ weight: 10 }],
          reps: 5,
          type: "TestType"
        };
        user.days[0].activities[0].routines.push(newRoutine);
        user.save().then(() => {
          User.findOne({ email: "example.user1@email.com" }).then(user => {
            assert(user.days[0].activities[0].routines.length === 3);
            done();
          });
        });
      });
  });
  //Modify a routine by changing the amount of reps and add a set
  it("update a routine", done => {
    User.findOne({ email: "example.user1@email.com" })
      .where({ "days.date": generators.getTime() })
      .then(user => {
        newRoutine = user.days[0].activities[0].routines[0];
        newRoutine.sets.push({ weight: 33 });
        newRoutine.reps = 12;
        user.days[0].activities[0].routines.map(routine => {
          routine._id === newRoutine._id ? (routine = newRoutine) : null;
        });
        user.save().then(() => {
          User.findOne({ email: "example.user1@email.com" }).then(user => {
            routine = user.days[0].activities[0].routines[0];
            assert(routine.reps === 12);
            assert(routine.sets.length === 4);
            done();
          });
        });
      });
  });
  //Trying to update a field that does not exist
  it("try to update a field that does not exist", done => {
    User.findOne({ email: "example.user1@email.com" }).then(user => {
      const newField = "ThisFieldDoesNotExist";
      user.field1 = newField;
      user.save().then(doc => {
        User.findOne({ email: "example.user1@email.com" }).then(doc => {
          //If the field is undefined it does not exist. Mongoose doesn't
          //push fields that are not included in the schema
          assert(doc.field1 === undefined);
          done();
        });
      });
    });
  });
});
