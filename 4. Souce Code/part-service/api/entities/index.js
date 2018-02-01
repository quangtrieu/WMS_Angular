"use strict";

var fs = require('fs');
var path = require('path');
var dbUtil = require('../../../tceas-utils/utils/database');
var env = process.env.NODE_ENV || "development";

var configLog = require(path.resolve(__dirname,'../../config', 'configLog.json'))[env];
dbUtil.initDbLog(configLog);

var config = require(path.resolve(__dirname,'../../config', 'config.json'))[env];
module.exports = dbUtil.initDb(config, env);