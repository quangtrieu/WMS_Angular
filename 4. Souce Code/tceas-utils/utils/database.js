'use strict';

const db = require('../entities');
const dbLog = require('../entities/logs');
const redisCache = require('../utils/redisCache');

module.exports = {
  initDb: function (config, evn) {
    return db.initDb(config, evn);
  },

  initDbLog: function (config) {
    return dbLog.initDb(config);
  },

  initDbRedisCache: function (config) {
    return redisCache.initDb(config);
  }
}