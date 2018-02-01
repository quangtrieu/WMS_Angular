'use strict';

var redis = require('redis');
var path = require('path');

var env = process.env.NODE_ENV || "development";
var config = require(path.resolve(__dirname, '../config', 'configRedis.json'))[env];


var redisClient = redis.createClient({ host: config.server, port: config.port });
redisClient.on('ready', function () {
    console.log("Redis is running on:" + config.server + " port: " + config.port);
});

redisClient.on('error', function () {
    console.log("Error in Redis");
});

exports.setRedisCache = function (redisKey, data) {
    redisClient.set(redisKey, data,
        function (err) {
            if (err) {
                return console.log(err);
            }
            redisClient.expire(redisKey, 0);
        }
    );
};

module.exports = redisClient;
