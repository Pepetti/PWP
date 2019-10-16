/**
 * @file users.js
 * @description Contains routes for user functionality
 */

//TODO Create handle for logging out (revoke tokens) MAYBE LATER
//TODO create a handle for modifying a routine
//TODO Create a handle for modifying user information (password etc) MAYBE LATER, NOT MANDATORY ATM

require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../config/verifyToken");
const utils = require("../utils/utils.js");

//Login handle
router.post("/login", (req, res) => {
  const { email, pass } = req.body;
  let errors = [];
  if (!email || !pass) {
    errors.push({ error: "Bad request. Missing parameters" });
    res.status(400).send(errors);
  } else {
    User.findOne({ email: email }).then((user, err) => {
      if (err) {
        res.status(500).send({
          error: "Internal error, please try again",
          validationError: false
        });
      } else if (!user) {
        errors.push({ error: "Incorrect email or password!" });
        res.status(401).send(errors);
      } else {
        if (!bcrypt.compareSync(pass, user.password)) {
          errors.push({ error: "Incorrect email or password!" });
          res.status(401).send(errors);
        } else {
          const usr = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user._id,
            days: user.days
          };
          const token = jwt.sign({ user: usr }, process.env.SECRET, {
            expiresIn: "1h"
          });
          res.status(200).json({ token, usr });
        }
      }
    });
  }
});

//Register handle
router.post("/register", (req, res) => {
  const { firstName, lastName, email, password, password2, email2 } = req.body;
  let errors = [];
  if (!firstName || !lastName || !email || !password || !password2 || !email2) {
    res.status(500).send({
      error: "Missing parameters, please fill out all the required fields"
    });
  } else {
    if (!email.includes("@")) {
      errors.push({
        error: "Not a valid email!",
        validationError: true
      });
    }
    if (email !== email2) {
      errors.push({
        error: "Emails don't match!",
        validationError: true
      });
    }
    if (password !== password2) {
      errors.push({
        error: "Passwords don't match!",
        validationError: true
      });
    }
    if (password.length < 6) {
      errors.push({
        error: "Password needs to be 6 characters or more!",
        validationError: true
      });
    }

    if (errors.length !== 0) {
      res.status(400).send({ errors: errors, validationError: true });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user === null) {
          const hash = bcrypt.hashSync(password, 13);
          const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            password: hash,
            days: []
          });
          newUser
            .save()
            .then(() => {
              res.status(200).send({ msg: "registered" });
            })
            .catch(err => {
              if (err.type === "MongoError" && err.code === 11000) {
                errors.push({
                  error: "User already registered with this email!",
                  validationError: true
                });
                res.status(400).send({
                  errors: errors
                });
              } else {
                errors = [];
                errors.push({
                  errors: "Internal error. Try again.",
                  validationError: false
                });
                console.log("ERROR: ", err);
                res.status(500).send({
                  errors: errors,
                  validationError: false
                });
              }
            });
        } else {
          errors.push({
            error: "User already registered with this email!"
          });
          res.status(400).send({
            errors: errors,
            validationError: true
          });
        }
      });
    }
  }
});

//Activity creation handle. If date doesn't exists (nothing has been done on the given day)
//we create the day object
router.post("/day/activity", verifyToken, (req, res) => {
  let tempDate = null;
  const { date, activity, email } = req.body;
  if (!date || !activity || !email) {
    res.status(400).send({ error: "Bad request, missing parameters" });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user === null) {
        res.sendStatus(404);
      }
      tempDate = user.days.filter(day => {
        return day.date === date;
      });
      if (tempDate.length === 0) {
        const dateObj = {
          date: date,
          activities: activity
        };
        user.days.push(dateObj);
        user.save().then(doc => {
          const usr = {
            firstName: doc.firstName,
            lastName: doc.lastName,
            email: doc.email,
            id: doc._id,
            days: doc.days
          };
          res.status(200).json({ usr });
        });
      } else {
        let index = null;
        user.days.filter(day => {
          if (day.date === date) {
            index = user.days.indexOf(day);
          }
        });
        if (index === null) {
          res.sendStatus(500);
        } else {
          user.days[index].activities.push(activity);
          user.save().then(doc => {
            const usr = {
              firstName: doc.firstName,
              lastName: doc.lastName,
              email: doc.email,
              id: doc._id,
              days: doc.days
            };
            res.status(200).json({ usr });
          });
        }
      }
    });
  }
});

//Handle for removing an activity
router.delete("/day/activity", verifyToken, (req, res) => {
  const { email, date, activityID } = req.body;
  if (!email || !date || !activityID) {
    res.status(400).send({ error: "Bad request, missing parameters" });
  } else {
    let errors = [];
    let tempDate = null;
    let index = null;
    let newActivities = null;
    User.findOne({ email: email }).then(user => {
      if (user === null) {
        errors.push({ error: "User not found" });
        res.status(404).send(errors);
      } else {
        tempDate = user.days.filter(day => {
          return day.date === date;
        });
        if (tempDate.length === 0) {
          errors.push({ error: "Date not found" });
          res.status(404).send(errors);
        } else {
          user.days.filter(day => {
            if (day.date === date) {
              index = user.days.indexOf(day);
            }
          });
          if (index === null) {
            res.sendStatus(500);
          } else {
            try {
              //tempDate[0].activities.remove(activityID);
              newActivities = tempDate[0].activities.filter(acti => {
                return acti.activityId !== activityID;
              });
            } catch (err) {
              console.log(err);
            }
            user.days[index].activities = newActivities;
            user.save().then(doc => {
              //For some reason the date is missing from the doc we get for the day
              //we just deleted an activity from, so we set it manually from the tempDate
              //THIS WORKS SO DON'T MODIFY
              doc.days[index].date = tempDate[0].date;
              const usr = {
                firstName: doc.firstName,
                lastName: doc.lastName,
                id: doc._id,
                email: doc.email,
                days: doc.days
              };
              res.status(200).json({ usr });
            });
          }
        }
      }
    });
  }
});

//Handle for modifying activity
router.patch("/day/activity", verifyToken, (req, res) => {
  const { id, date, activityID, newActivity } = req.body;
  if (!id || !date || !activityID || !newActivity) {
    res.status(400).send({ error: "Bad request, missing parameters" });
  } else {
    let errors = [];
    let tempDate = null;
    let index = null;
    let d_index = null; //Date index
    User.findById(id)
      .then(user => {
        if (user === null) {
          errors.push({ error: "User not found" });
          res.status(404).send(errors);
        } else {
          tempDate = user.days.filter(day => {
            if (day.date === date) {
              d_index = user.days.indexOf(day);
              return day;
            }
          });
          if (tempDate.length === 0) {
            errors.push({ error: "Date not found" });
            res.status(404).send(errors);
          } else {
            tempDate[0].activities.filter(act => {
              if (act.activityId === activityID) {
                newActivity.activityId = act.activityId;
                index = tempDate[0].activities.indexOf(act);
              }
            });
            if (index === null) {
              errors.push({ error: "Activity not found" });
              res.status(404).send(errors);
            } else {
              user.days[d_index].activities[index] = newActivity;
              console.log(newActivity);
              user.save().then(doc => {
                const usr = {
                  firstName: doc.firstName,
                  lastName: doc.lastName,
                  _id: doc._id,
                  email: doc.email,
                  days: doc.days
                };
                res.status(200).send(usr);
              });
            }
          }
        }
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }
});

//Handle for adding a routine to an activity
router.post("/day/activity/routine", verifyToken, (req, res) => {
  const { id, date, activityId, routine } = req.body;
  if (!id || !date || !activityId || !routine) {
    res.status(400).send({ error: "Bad request, missing parameters" });
  } else if (!routine.sets || !routine.reps || !routine.type) {
    res.status(400).send({ error: "Bad request, missing parameters" });
  } else {
    let tempDate = null;
    let d_index = null; //Date index
    let a_index = null; //Activity index
    let errors = [];
    User.findById(id)
      .then(user => {
        if (user === null) {
          errors.push({ error: "User not found" });
          res.status(404).send(errors);
        } else {
          tempDate = user.days.filter(day => {
            if (day.date === date) {
              d_index = user.days.indexOf(day);
              return day;
            }
          });
          if (tempDate.length === 0) {
            errors.push({ error: "Date not found" });
            res.status(404).send(errors);
          } else {
            user.days[d_index].activities.filter(activity => {
              if (activity.activityId === activityId) {
                a_index = user.days[d_index].activities.indexOf(activity);
              }
            });
            if (a_index === null) {
              errors.push({ error: "Activity not found" });
              res.status(404).send(errors);
            } else {
              user.days[d_index].activities[a_index].routines.push(routine);
              user.save().then(doc => {
                const usr = {
                  firstName: doc.firstName,
                  lastName: doc.lastName,
                  id: doc._id,
                  email: doc.email,
                  days: doc.days
                };
                res.status(200).json({ usr });
              });
            }
          }
        }
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }
});

//Handle for deleting a routine from an activity
router.delete("/day/activity/routine", verifyToken, (req, res) => {
  const { id, date, activityId, routineId } = req.body;
  if (!id || !date || !activityId || !routineId) {
    res.status(400).send({ error: "Bad request, missing parameters" });
  } else {
    let tempDate = null; //Temporary date object
    let tempRoutines = null; //Temporary date object
    let d_index = null; //Date index
    let a_index = null; //Activity index
    let errors = []; //Error array
    User.findById(id) //Find user by user _id
      .then(user => {
        if (user === null) {
          //If user is null we didn't find a user
          errors.push({ error: "User not found" });
          res.status(404).send(errors);
        } else {
          tempDate = user.days.filter(day => {
            if (day.date === date) {
              d_index = user.days.indexOf(day);
              return day; // Return the day object to be modified
            }
          });
          if (tempDate.length === 0) {
            //If the tempdate length 0, there is no day
            errors.push({ error: "Date not found" });
            res.status(404).send(errors);
          } else {
            user.days[d_index].activities.filter(activity => {
              if (activity.activityId === activityId) {
                a_index = user.days[d_index].activities.indexOf(activity); // Get activity index
              }
            });
            if (a_index === null) {
              //If activity index is still null, the activity id cannot be found
              errors.push({ error: "Activity not found" });
              res.status(404).send(errors);
            } else {
              //Form a new array that does not have the routine desired for deletion
              tempRoutines = user.days[d_index].activities[
                a_index
              ].routines.filter(routine => {
                return routine.routineId !== routineId;
              });
              user.days[d_index].activities[a_index].routines = tempRoutines;
              //Save the modified user and send the updated user object
              user.save().then(doc => {
                const usr = {
                  firstName: doc.firstName,
                  lastName: doc.lastName,
                  id: doc._id,
                  email: doc.email,
                  days: doc.days
                };
                res.status(200).json({ usr }); //Send response and user object as json
              });
            }
          }
        }
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }
});

//Handle for removing a day
router.delete("/day", verifyToken, (req, res) => {
  const { date, email } = req.body;
  if (!date || !email) {
    res.status(400).send({ error: "Bad request, missing parameters" });
  } else {
    let errors = [];
    let tempDate = null;
    User.findOne({ email: email })
      .then(user => {
        if (user === null) {
          errors.push({ error: "User not found" });
          res.status(404).send(errors);
        } else {
          tempDate = user.days.filter(day => {
            return day.date === date;
          });
          if (tempDate.length === 0) {
            errors.push({ error: "Date already removed" });
            res.status(404).send(errors);
          } else {
            tempDays = user.days.filter(day => {
              return day.date !== tempDate[0].date;
            });
            user.days = tempDays;
            user
              .save()
              .then(doc => {
                const usr = {
                  firstName: doc.firstName,
                  lastName: doc.lastName,
                  email: doc.email,
                  days: doc.days,
                  id: doc._id
                };
                res.status(200).json({ usr });
              })
              .catch(err => {
                console.log(err);
                res.sendStatus(500);
              });
          }
        }
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }
});

//Logout handle
router.get("/logout", verifyToken, (req, res) => {
  res.sendStatus(200);
});

//Token authentication
router.get("/auth", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
