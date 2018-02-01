"use strict";

module.exports = function (mongoose) {
    var schema = new mongoose.Schema({
        path: String,
        header: String,
        body: String,
        method: String,
        message: String,
        createdDate: Date
    });

    return mongoose.model('ErrorLog', schema);
}