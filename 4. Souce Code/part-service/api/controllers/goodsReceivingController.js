'use strict';

const goodsReceivingService = require('../services/goodsReceivingService');
const redisClient = require('../../commons/redisCache');
const constants = require('../constant/appConstants');
const messageConstants = require('../constant/messageConstants');
const Utils = require('../../commons/utils');
var logUtil = require('../../../tceas-utils/utils/log');
var asyncMiddleware = require('../../../tceas-utils/middleware/async');

var goodsReceivingKey = {};

exports.getListPartByWorkShopId = function (req, res) {
    var workShopId = req.body.workshopId;

    var keyGetListPartByWorkShopId = "getListPartByWorkShopId_" + workShopId;
    redisClient.get(keyGetListPartByWorkShopId, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }

        if (data) {
            res.json(JSON.parse(data));
        } else {
            goodsReceivingService.getListPartByWorkShopId(workShopId).then(function (result) {
                var response = { success: 1, data: result };

                Utils.setRedisCache(keyGetListPartByWorkShopId, JSON.stringify(response));
                res.json(response);
            }).catch((err) => {
                let response = { success: 0, data: null, message: err };
                res.json(response);
                logUtil.handleError({ req, err })
            });
        }
    });
}

exports.create = function (req, res) {
    goodsReceivingService.createStore(req.body)
        .then(result => {
            res.json({ success: true, message: messageConstants.COMMON_CREATE_SUCCESS });
        })
        .catch(err => {
            res.json({ success: false, message: messageConstants.ERROR });
        })
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
                goodsReceivingService.parseExcel(targetPath).then(result => {
                    return res.json({ success: true, message: messageConstants.COMMON_CREATE_SUCCESS });
                }).catch(err => {
                        return res.json({ success: false, message: messageConstants.ERROR });
                    });
            })
        });
    }
});

exports.getListBinByWorkShopId = function (req, res) {
    var workShopId = req.body.workshopId;

    var keyGetListBinByWorkShopId = "getListBintByWorkShopId_" + workShopId;
    redisClient.get(keyGetListBinByWorkShopId, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }

        if (data) {
            res.json(JSON.parse(data));
        } else {
            goodsReceivingService.getListBinByWorkShopId(workShopId).then(function (result) {
                var response = { success: 1, data: result };

                Utils.setRedisCache(keyGetListBinByWorkShopId, JSON.stringify(response));
                res.json(response);
            }).catch((err) => {
                let response = { success: 0, data: null, message: err };
                res.json(response);
                logUtil.handleError({ req, err })
            });
        }
    });
}

exports.getAll = function (req, res) {

    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);
    var grnKey = "GRN_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;

    redisClient.get(grnKey, function (err, data) {
        if (err) {
            return console.log(err);
        }

        // check redis cache data
        if (data) {
            //get data from redis cache
            res.json(JSON.parse(data));
        } else {
            // call service to create data
            goodsReceivingService
                .getAll(req.body)
                .then(function (result) {
                    var response = {
                        success: true,
                        data: result
                    };
                    Utils.setRedisCache(grnKey, JSON.stringify(response));
                    res.json(response);
                }).catch(function (error) {
                    console.log(error);
                    logUtil.handleError({ req, error })
                }
                );
        }
    });
}