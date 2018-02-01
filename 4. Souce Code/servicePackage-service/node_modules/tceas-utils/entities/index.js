"use strict";

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

module.exports = {
    initDb: function (config, evn) {
        if (process.env.DATABASE_URL) {
            var sequelize = new Sequelize(process.env.DATABASE_URL, config);
        } else {
            var sequelize = new Sequelize(config.database, config.username, config.password, config);
        }

        var db = {};

        fs.readdirSync(__dirname)
            .filter(function (file) {
                return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "logs");
            })
            .forEach(function (file) {
                var model = sequelize.import(path.join(__dirname, file));
                db[model.name] = model;
            });

        Object.keys(db).forEach(function (modelName) {
            if ("associate" in db[modelName]) {
                db[modelName].associate(db);
            }
        });

        db.sequelize = sequelize;
        return db;
    }
}
