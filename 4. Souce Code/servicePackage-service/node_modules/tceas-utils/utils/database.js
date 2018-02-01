'use strict';

const db = require('../entities');
const dbLog = require('../entities/logs');

module.exports = {
  initDb: function (config, evn) {
    return db.initDb(config, evn);
  },

  initDbLog: function (config) {
    return dbLog.initDb(config);
  }
}