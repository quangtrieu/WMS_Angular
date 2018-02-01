var ResponseAPI = require('../commons/responseApi');

exports.notFound = function notFound(req, res, next) {
    var responseApi = new ResponseAPI(404, 'You seem lost. You must have taken a wrong turn back there.', true);
    res.send(responseApi)
}

exports.error = function (err, req, res, next) {
    console.log(err);
    var responseApi = new ResponseAPI(500, 'Something broke. What did you do.', true);
    res.send(responseApi);
}

exports.errorDenied = function (err, req, res, next) {
    console.log(err);
    var responseApi = new ResponseAPI(401, 'Access denied!', true);
    res.send(responseApi);
}