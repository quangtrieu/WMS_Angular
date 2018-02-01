'use strict';

process.env.NODE_ENV = 'test';
var chai = require('chai');

var assert = chai.assert;

describe('UserService', function () {

    before(function () {
        return require('../../../api/entities').sequelize.sync();
    });

    beforeEach(function () {
        this.UserService = require('../../../api/services/userService');
    });

    describe('findById', function () {
        it('it should GET success a user by id', function () {
            var expected = 1;
            return this.UserService.findById(expected).bind(this).then(function (user) {
                assert.equal(user.id, expected);
            });
        });

        it('it should GET not found user by id', function () {
            var expected = 0;
            return this.UserService.findById(expected).bind(this).then(function (user) {
                assert.isNull(user);
            });
        });
    });
});

