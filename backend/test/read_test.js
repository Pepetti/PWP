/**
 * @file read_test.js
 * @description Test to read from mongoDB
 */

const User = require('../models/user.js');
const assert = require('assert');

describe('Reading user details', () => {
    //Finds a user with the unique email address
    it('finds user with email as example.user1@email.com', done => {
        User.find({email: 'example.user1@email.com'}).then(result => {
            assert(result[0].email === 'example.user1@email.com');
            assert(result[0].firstName === 'Example');
            assert(result[0].lastName === 'User1');
            done();
        });
    });
    //Tries to find a user that doesn't exist
    it('find user non-existent user', done => {
        User.findOne({email: 'doesnotexist'}).then(result => {
            if (result === null) {
                console.log(
                    'user with the email: doesnotexist, does not exist',
                );
                done();
            } else {
                throw new Error();
            }
        });
    });
});
