var redis = require('redis');
var redisClient;

module.exports = {
    initDb : function (config) {
       redisClient = redis.createClient({
            host: config.server,
            port: config.port
        });
        redisClient.on('ready', function () {
            console.log("Redis is running on:" + config.server + " port: " + config.port);
        });

        redisClient.on('error', function () {
            console.log("Error in Redis");
        });

        return redisClient;
    },

    redisClient: redisClient
}