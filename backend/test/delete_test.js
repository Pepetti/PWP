/**
 * @file delete_test.js
 * @description Tests remove function on the database in
 *              different ways
 */

const assert = require("assert");
const User = require("../models/user");
const generators = require("../generators");

describe("Delete_test", () => {
  //Removes a user via email
  it("removes a user with email", done => {
    User.findOneAndRemove({ email: "example.user1@email.com" }).then(() => {
      User.findOne({ email: "example.user1@email.com" }).then(result => {
        assert(result === null);
        done();
      });
    });
  });
  //Removes a user with it's id. We do not know the id beforehand,
  //so we have to find it via user email
  it("removes a user with id", done => {
    User.findOne({ email: "example.user1@email.com" }).then(result => {
      const id = result._id;
      User.findByIdAndRemove(id).then(() => {
        User.findOne({ _id: id }).then(result => {
          assert(result === null);
          done();
        });
      });
    });
  });
  //Removes a user sub-document
  it("removes user sub-document DAY", done => {
    const date = generators.getTime();
    User.findOne({ email: "example.user1@email.com" }).then(user => {
      var day = user.days
        .filter(day => {
          return day.date === date;
        })
        .pop();
      user.days.id(day._id).remove();
      user.save().then(result => {
        User.findOne({ email: "example.user1@email.com" }).then(result => {
          assert(result.days.length === 0);
          done();
        });
      });
    });
  });
});
