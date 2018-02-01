'use strict';

var redisClient = require('../commons/redisCache');
var constants = require('../api/constant/appConstants');

// #region redis cache

exports.setRedisCache = function (redisKey, data) {
    redisClient.set(redisKey, data,
        function (err) {
            if (err) {
                return console.log(err);
            }
            redisClient.expire(redisKey, constants.REDIS_TIMEOUT);
        }
    );
};

exports.clearRedisCache = function (redisKey) {
    redisClient.set(redisKey, null,
        function (err) {
            if (err) {
                return console.log(err);
            }
            redisClient.expire(redisKey, constants.REDIS_RESET);
        }
    );
};

// #endregion


