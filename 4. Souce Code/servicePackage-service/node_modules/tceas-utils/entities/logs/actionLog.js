"use strict";

module.exports = function (mongoose) {
    var schema = new mongoose.Schema({
        name: String,
        createdBy: String,
        message: String,
        createdDate: Date
    });

    return mongoose.model('ActionLog', schema);
}