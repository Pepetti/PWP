/**
 * @file read_test.js
 * @description Test to read from mongoDB
 */

const User = require('../models/user.js');
const assert = require('assert');

describe('Reading user details', () => {
    it('finds user with email as example.user1@email.com', done => {
        User.find({email: 'example.user1@email.com'}).then(result => {
            assert(result[0].email === 'example.user1@email.com');
            assert(result[0].firstName === 'Example');
            assert(result[0].lastName === 'User1');
            done();
        });
    });
});
