'use strict';

const workPersonnelService = require('../services/workPersonnelService');
const redisClient = require('../../commons/redisCache');
const constants = require('../constant/appConstants');
const Utils = require('../../commons/utils');
const messageConstants = require('../constant/messageConstants');
var workPersonnelKey = "";
var logUtil = require('../../../tceas-utils/utils/log');

exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);

    workPersonnelKey = "workPersonnel_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;
    redisClient.get(workPersonnelKey, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }
        if (data) {
            res.json(JSON.parse(data)); //get data from redis cache
        } else {
            workPersonnelService.getAll(req.body).then(function (result) {
                var response = { success: 1, data: { count: (result != null) ? result.count : 0, rows: result.rows } };
                redisClient.set(workPersonnelKey, JSON.stringify(response),
                    function (err) {
                        if (err) {
                            let response = { success: 0, data: null, message: err };
                            res.json(response);
                        }
                        redisClient.expire(workPersonnelKey, constants.REDIS_TIMEOUT);
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
 * Get workPersonnel by id
 */
exports.getById = function (req, res) {
    workPersonnelService.findById(req.params.id).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}

/**
 * Get workPersonnel by id
 */
exports.getRole = function (req, res) {
    workPersonnelService.getRole().then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}

/**
 * update WorkShopPersonnel
 */
exports.updateWorkShopPersonnel = function (req, res) {
    workPersonnelService.update(req.body).then(result => {
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
 * create WorkShopPersonnel Employee and EmployeeRole
 */
exports.create = function (req, res) {
    workPersonnelService.create(req.body).then(result => {
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