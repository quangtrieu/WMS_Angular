'use strict';

const vehicleMakeService = require('../services/vehicleMakeService');
const redisClient = require('../../commons/redisCache');
const constants = require('../constant/appConstants');
const Utils = require('../../commons/utils');
var vehicleMakeKey = "";
var logUtil = require('../../../tceas-utils/utils/log');

exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);

    vehicleMakeKey = "vehicleMake_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;
    redisClient.get(vehicleMakeKey, function (err, data) {
        if (err) {
            let response = {
                success: 0,
                data: null,
                message: err
            };
            res.json(response);
        }
        if (data) {
            res.json(JSON.parse(data)); //get data from redis cache
        } else {
            vehicleMakeService.getAll(req.body).then(function (result) {
                var response = {
                    success: 1,
                    data: {
                        count: (result != null) ? result.count : 0,
                        rows: result.rows
                    }
                };
                redisClient.set(vehicleMakeKey, JSON.stringify(response),
                    function (err) {
                        if (err) {
                            let response = {
                                success: 0,
                                data: null,
                                message: err
                            };
                            res.json(response);
                        }
                        redisClient.expire(vehicleMakeKey, constants.REDIS_TIMEOUT);
                    });
                res.json(response);
            }).catch((err) => {
                let response = {
                    success: 0,
                    data: null,
                    message: err
                };
                res.json(response);
                logUtil.handleError({
                    req,
                    err
                })
            });
        }
    });
}

/**
 * Get vehicleMake by id
 */
exports.getById = function (req, res) {
    vehicleMakeService.findById(req.params.id).then(function (result) {
        var response = {
            success: true,
            data: result
        };
        res.json(response);
    }).catch(function (err) {
        let response = {
            success: 0,
            data: null,
            message: err
        };
        res.json(response);
        logUtil.handleError({
            req,
            err
        })
    });
}

/**
 * check exists Code vehicleMake
 */
exports.checkExistCode = function (req, res) {
    vehicleMakeService.isExistCode(req.body.code).then(function (count) {
        var response = {
            success: true,
            data: (count != 0 ? true : false)
        };
        res.json(response);
    }).catch(function (err) {
        let response = {
            success: 0,
            data: null,
            message: err
        };
        res.json(response);
        logUtil.handleError({
            req,
            err
        })
    });
}

/**
 * Create new vehicleMake
 */
exports.create = (req, res) => {
    vehicleMakeService.create(req.body).then(result => {
        if (result) {
            Utils.clearRedisCache(vehicleMakeKey);
            return res.json(result);
        }
    }).catch(err => {
        res.json({
            success: false,
            message: err
        });
        logUtil.handleError({
            req,
            err
        })
    });
}

/**
 * Update vehicleMake
 */
exports.update = function (req, res) {
    vehicleMakeService.update(req.body).then(result => {
        if (result) {
            Utils.clearRedisCache(vehicleMakeKey);
            res.json(result);
        }
    }).catch(err => {
        res.json({
            success: false,
            message: err
        });
        logUtil.handleError({
            req,
            err
        })
    })
}

exports.filter = function (req, res) {
    vehicleMakeService.filter(req.body)
        .then(result => {
            var response = {
                success: 1,
                data: {
                    count: (result != null) ? result.count : 0,
                    rows: result.rows
                }
            };
            res.json(response);
        })
        .catch(err => {
            let response = {
                success: 0,
                data: null,
                message: err
            };
            res.json(response);
            logUtil.handleError({
                req,
                err
            })
        });
}