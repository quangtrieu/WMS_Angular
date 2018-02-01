'use strict';

process.env.NODE_ENV = 'test';
var chai = require('chai');
var assert = chai.assert;

describe('User model', function () {
    before(function () {
        this.mockUser = {
            "userName": "owen",
            "passwordSalt": "905b7fa8-8428-402f-94ef-fed088069763",
            "isLockedOut": 0,
            "isDisabled": 0,
            "fullName": "wilson",
            "createdDateTime": "2017-04-21T10:10:36.000Z",
            "email": "owen@gmail.com",
            "firstName": "wilson",
            "lastName": "owen",
            "address": "England",
            "telephone": "0988170213",
            "minLength": 0
        };
        return require('../../../api/entities').sequelize.sync();
    });

    beforeEach(function () {
        this.Users = require('../../../api/entities').Users;
    });

    describe('Validation Field', function () {
        it('it should validate unique userName', function () {
            var expected = "jindo";
            return this.Users.create({ userName: 'jindo', email: 'vutienhoa@gmail.com' }).bind(this).then(function (user) { })
                .catch(function (error) {
                    var actual = error.message;
                    assert.equal(actual, expected);
                });
        });
        it('it should validate email', function () {
            var expected = "notNull Violation: email cannot be null";
            return this.Users.create({ userName: 'jindo' }).bind(this).then(function (user) { })
                .catch(function (error) {
                    var actual = error.message;
                    assert.equal(actual, expected);
                });
        });
        it('it should create user success', function () {
            var expectedUserName = "owen";
            var expectedEmail = "owen@gmail.com";
            return this.Users.create(this.mockUser).bind(this).then(function (user) {
                assert.equal(user.userName, expectedUserName);
                assert.equal(user.email, expectedEmail);
            });
        });
    });
});