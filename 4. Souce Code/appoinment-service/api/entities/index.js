"use strict";

var fs = require('fs');
var path = require('path');
var dbUtil = require('../../../tceas-utils/utils/database');
var env = process.env.NODE_ENV || "development";

var configLog = require(path.resolve(__dirname,'../../config', 'configLog.json'))[env];
var logDb = dbUtil.initDbLog(configLog);


var configRedis = require(path.resolve(__dirname,'../../config', 'configRedis.json'))[env];
var redisDb = dbUtil.initDbRedisCache(configRedis);

var config = require(path.resolve(__dirname,'../../config', 'config.json'))[env];
var db = dbUtil.initDb(config, env);

module.exports = {
    db: db,
    redisDb: redisDb,
    logDb
}
