"use strict";

var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = {};
module.exports = {
    initDb: function (config) {
        var connection = `mongodb://${config.host}:${config.port}/${config.database}`;
        db.connect = mongoose.connect(connection, {
            useMongoClient: true
        });

        fs.readdirSync(__dirname)
            .filter(function (file) {
                return (file.indexOf(".") !== 0) && (file !== "index.js");
            })
            .forEach(function (file) {
                var schema = require(path.join(__dirname, file))(mongoose);
                db[schema.modelName] = schema;
            });
    },
    db: db
}