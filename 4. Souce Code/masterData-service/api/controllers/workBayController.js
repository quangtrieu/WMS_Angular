'use strict';

const workBayService = require('../services/workBayService');
const redisClient = require('../../commons/redisCache');
const constants = require('../constant/appConstants');
const Utils = require('../../commons/utils');
const messageConstants = require('../constant/messageConstants');
var workBayKey = "";
var logUtil = require('../../../tceas-utils/utils/log');

exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);

    workBayKey = "workBay_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;
    redisClient.get(workBayKey, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }
        if (data) {
            res.json(JSON.parse(data)); //get data from redis cache
        } else {
            workBayService.getAll(req.body).then(function (result) {
                var response = { success: 1, data: { count: (result != null) ? result.count : 0, rows: result.rows } };
                redisClient.set(workBayKey, JSON.stringify(response),
                    function (err) {
                        if (err) {
                            let response = { success: 0, data: null, message: err };
                            res.json(response);
                        }
                        redisClient.expire(workBayKey, constants.REDIS_TIMEOUT);
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

/**
 * Get workbay by id
 */
exports.getById = function (req, res) {
    workBayService.findById(req.params.id).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}

/**
 * Get Hoist
 */
exports.getHoist = function (req, res) {
    workBayService.findHoist().then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}

/**
 * Get Bay Type
 */
exports.getBayType = function (req, res) {
    workBayService.findBayType().then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}

/**
 * Get Employee
 */
exports.getEmployee = function (req, res) {
    workBayService.findEmployee().then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}

/**
 * create WorkShopPersonnel Employee and EmployeeRole
 */
exports.create = function (req, res) {
    workBayService.create(req.body).then(result => {
        if (result) {
            res.json({ success: 1, message: messageConstants.SUCCESS });
        } else {
            res.json({ success: 0, message: messageConstants.NOT_EXIST });
        }
    }).catch(err => {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    })
}

/**
 * Update customer
 */
exports.update = function (req, res) {
    workBayService.update(req.body)
        .then(result => {
            if (result) {
                res.json({ success: true, message: messageConstants.SUCCESS });
            } else {
                res.json({ success: false, message: messageConstants.NOT_EXIST });
            }
        })
        .catch(err => {
            res.json({ success: false, message: messageConstants.ERROR });
            logUtil.handleError({ req, err })
        })
}