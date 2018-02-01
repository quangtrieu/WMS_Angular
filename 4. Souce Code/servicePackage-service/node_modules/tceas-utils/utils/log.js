const db = require('../entities/logs').db;

module.exports.handleError = function (data) {
    try {
        var log = {}
        log.message = JSON.stringify(data.err) + '\n' + data.err.stack.toString()
        log.path = data.req.originalUrl
        log.body = JSON.stringify(data.req.body);
        log.header = JSON.stringify(data.req.headers);
        log.method = data.req.method;
        return new db.ErrorLog(log).save();
    }
    catch (ex) {
        console.log(ex);
    }
}

module.exports.actionLog = function (data) {
    var log = {
        name: 'name',
        createdBy: 'createdBy',
        message: 'message',
        createdDate: Date()
    }
    return new db.ActionLog(log).save();
}