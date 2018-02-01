'use strict';

const partMasterService = require('../services/partMasterService');
const redisClient = require('../../commons/redisCache');
const constants = require('../constant/appConstants');
const messageConstants = require('../constant/messageConstants');
const Utils = require('../../commons/utils');
var logUtil = require('../../../tceas-utils/utils/log');

var partMasterKey = {};

exports.getall = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);
    partMasterKey = "PartMaster" + currentPage + "_" + pageSize + "_" + data + "_" + sort;

    redisClient.get(partMasterKey, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }
        if (data) {
            res.json(JSON.parse(data));
        } else {
            // call service to create data
            partMasterService.getall(req.body).then(function (result) {
                var response = { success: 1, data: { count: (result != null) ? result.count : 0, rows: result.rows } };
                Utils.setRedisCache(partMasterKey, JSON.stringify(response),
                    function (err) {
                        if (err) {
                            let response = { success: 0, data: null, message: err };
                            res.json(response);
                        }
                        redisClient.expire(partMasterKey, constants.REDIS_TIMEOUT);
                    });
                res.json(response);
            }).catch((err) => {
                let response = { success: 0, data: null, message: err };
                res.json(response);
                logUtil.handleError({ req, err })
            });
        }
    });
}

exports.getListPartByWorkShopId = function (req, res) {
    var workShopId = req.params.workShopId;
    var vehicleVariantId = req.params.vehicleVariantId;

    var keyGetListPartByWorkShopId = "getListPartByWorkShopId_" + workShopId + "_vehicleVariantId_" + vehicleVariantId;
    redisClient.get(keyGetListPartByWorkShopId, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }

        if (data) {
            res.json(JSON.parse(data));
        } else {
            partMasterService.getListPartByWorkShopId(workShopId, vehicleVariantId).then(function (result) {
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

exports.getAllPartType = (req, res) => {
    var keyGetAllPartType = "getAllPartType";
    redisClient.get(keyGetAllPartType, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }

        if (data) {
            res.json(JSON.parse(data));
        } else {
            partMasterService.getAllPartType().then(function (result) {
                var response = { success: 1, data: result };

                Utils.setRedisCache(keyGetAllPartType, JSON.stringify(response));
                res.json(response);
            }).catch((err) => {
                let response = { success: 0, data: null, message: err };
                res.json(response);
                logUtil.handleError({ req, err })
            });
        }
    });
}

/**
 * Get PartMaster by id
 */
exports.getById = function (req, res) {
    partMasterService.findById(req.params.id).then(function (result) {
        var response = { success: 1, data: result };
        res.json(response);
    }).catch(function (e) {
        console.log(e);
        logUtil.handleError({ req, e })
    });
}

/**
 * Create new PartMaster
 */
exports.createPartMaster = function (req, res) {
    partMasterService.createPartMaster(req.body, res).then(result => {
        Utils.clearRedisCache(partMasterKey);
        res.json({ success: 1, data: result.id });
    }).catch(err => {
        res.json({ success: 0, message: messageConstants.ERROR });
        logUtil.handleError({ req, err })
    })
}

/**
 * Update PartMaster
 */
exports.updatePartMaster = function (req, res) {
    partMasterService.updatePartMaster(req.body, res).then(result => {
        if (result) {
            Utils.clearRedisCache(partMasterKey);
            res.json({ success: 1, data: result.id });
        } else {
            res.json({ success: 0, message: messageConstants.NOT_EXIST });
        }
    }).catch(err => {
        res.json({ success: 0, message: messageConstants.ERROR });
        logUtil.handleError({ req, err })
    })
}

/**
 * Delete PartMaster by id
 */
exports.deletePartMaster = function (req, res) {
    return partMasterService.deletePartMaster(req.params.id, res);
}

/**
 * Get part substitute by partId
 */
exports.getPartSubstitute = function (req, res) {
    partMasterService
        .getPartSubstitute(req.body)
        .then(function (result) {
            var response = {
                success: true,
                data: result
            };
            res.json(response);
        }).catch(function (error) {
            console.log(error);
        });
}