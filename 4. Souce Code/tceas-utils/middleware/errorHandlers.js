var logUtil = require('../utils/log');
var apiResponse = require('../models/apiResponse');

exports.error = function (err, req, res, next) {
    console.log(err);
    logUtil.handleError({
        req,
        err
    });
    res.json(apiResponse.error("Error roi nhe"));
}
