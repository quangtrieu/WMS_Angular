'use strict';

const servicePackageService = require('../services/servicePackageService');
const redisClient = require('../../commons/redisCache');
const constants = require('../constant/appConstants');
const messageConstants = require('../constant/messageConstants');
const Utils = require('../../commons/utils');
var logUtil = require('../../../tceas-utils/utils/log');
var asyncMiddleware = require('../../../tceas-utils/middleware/async');

var servicePackageKey = "";
exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);

    servicePackageKey = "servicePackageKey_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;
    redisClient.get(servicePackageKey, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }
        if (data) {
            res.json(JSON.parse(data)); //get data from redis cache
        } else {
            servicePackageService.getAll(req.body).then(function (result) {
                var response = { success: 1, data: { count: (result != null) ? result.count : 0, rows: result.rows } };
                Utils.setRedisCache(servicePackageKey, JSON.stringify(response))
                res.json(response);
            }).catch((err) => {
                let response = { success: 0, data: null, message: err };
                res.json(response);
                logUtil.handleError({ req, err })
            });
        }
    });
}

exports.getAllByVariantIdAndMilleage = (req, res) => {
    var vehicleVariantId = req.params.vehicleVariantId;
    var currentMilleage = req.params.currentMilleage;
    var packageTypeId = req.params.packageTypeId;

    servicePackageService.getAllByVariantIdAndMilleage(vehicleVariantId, packageTypeId, currentMilleage).then(result => {
        res.json({ success: true, data: result });
    }).catch(err => {
        res.json({ success: false, message: messageConstants.COMMON_RECORD_NOT_FOUND });
        logUtil.handleError({ req, err })
    });
}


exports.getAllPackageTypes = function (req, res) {

    var keyGetAllPackageTypes = "getAllPackageTypes";
    redisClient.get(keyGetAllPackageTypes, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }

        if (data) {
            res.json(JSON.parse(data));
        } else {
            servicePackageService.getAllPackageTypes().then(function (result) {
                var response = { success: 1, data: result };

                Utils.setRedisCache(keyGetAllPackageTypes, JSON.stringify(response));
                res.json(response);
            }).catch((err) => {
                let response = { success: 0, data: null, message: err };
                res.json(response);
                logUtil.handleError({ req, err })
            });
        }
    });
}

exports.getJobPartById = (req, res) => {
    servicePackageService.getJobPartById(req.params.id).then(result => {
        res.json({ success: true, data: result });
    }).catch(err => {
        res.json({ success: false, message: messageConstants.COMMON_RECORD_NOT_FOUND });
        logUtil.handleError({ req, err })
    });
}

exports.download = function (req, res) {
    // var path = require('path');
    // var fs = require('fs');
    // var targetPath = path.resolve('../upload/' + '1.pdf');
    // fs.readFile(targetPath,function(error,data){
    //     if(error){
    //        res.json({'status':'error',msg:err});
    //     }else{
    //        res.writeHead(200, {"Content-Type": "application/pdf"});
    //        res.write(data);
    //        res.end();       
    //     }
    // });
    //res.sendfile(targetPath); 

    var path = require('path');
    var mime = require('mime');
    var fs = require('fs');
    
      
    var file = path.resolve('../upload/' + '1.pdf');
    
    //   var filename = path.basename(file);
    //   var mimetype = mime.lookup(file);
    
    //   res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    //   res.setHeader('Content-type', mimetype);
      res.download(file); 
     
}

exports.upload = asyncMiddleware(async (req, res, next) => {
    {
        var formidable = require('formidable');
        var path = require('path');
        var fs = require('fs');

        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var file = files.file;
            var tempPath = file.path;
            if (!fs.existsSync('./upload/')) {
                fs.mkdirSync('./upload/');
            }
            var targetPath = path.resolve('./upload/' + file.name);
            fs.rename(tempPath, targetPath, function (err) {
                if (err) {
                    return res.json({ success: false, message: messageConstants.ERROR });
                }
                servicePackageService.parseExcel(targetPath).then(result => {
                    return res.json(result);
                }).catch(err => {
                        return res.json({ success: false, message: messageConstants.ERROR });
                    });
            })
        });
    }
});



