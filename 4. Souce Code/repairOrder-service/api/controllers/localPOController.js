'use strict';

const redisClient = require('../../commons/redisCache');
const messageConstants = require('../constant/messageConstants');
const localPOService = require('../services/localPOService');
const Utils = require('../../commons/utils');
var logUtil = require('../../../tceas-utils/utils/log');

var localPOKey = {};

/**
 * Get all LPO by paging
 */
exports.getAll = function (req, res) {

    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);
    localPOKey = "LPO_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;

    redisClient.get(localPOKey, function (err, data) {
        if (err) {
            return console.log(err);
        }

        // check redis cache data
        if (data) {
            //get data from redis cache
            res.json(JSON.parse(data));
        } else {
            // call service to create data
            localPOService
                .getAll(req.body)
                .then(function (result) {
                    var response = {
                        success: true,
                        data: result
                    };
                    Utils.setRedisCache(localPOKey, JSON.stringify(response));
                    res.json(response);
                }).catch(function (error) {
                    console.log(error);
                    logUtil.handleError({ req, error })
                }
                );
        }
    });
}

/**
 * Get all pd-data
 */
exports.getPDData = function (req, res) {
    localPOService.getPDData().then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (e) {
        console.log(e);
        res.json({ success: false, message: messageConstants.COMMON_RECORD_NOT_FOUND });
        logUtil.handleError({ req, e })
    });
}

/**
 * Get by id
 */
exports.getById = function (req, res) {
    localPOService.getById(req.params.id).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (e) {
        console.log(e);
        res.json({ success: false, message: messageConstants.COMMON_RECORD_NOT_FOUND });
        logUtil.handleError({ req, e })
    });
}

/**
 * Get RO by code
 */
exports.getROBySublet = function (req, res) {
    localPOService.getROBySublet(req.query.code).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (e) {
        console.log(e);
        res.json({ success: false, message: messageConstants.COMMON_RECORD_NOT_FOUND });
        logUtil.handleError({ req, e })
    });
}

/**
 * Get all sublet by part and job
 */
exports.getAllSubletByPartJob = function (req, res) {
    localPOService.getAllSubletByPartJob(req.body.partIds, req.body.jobIds).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (e) {
        console.log(e);
        res.json({ success: false, message: messageConstants.COMMON_RECORD_NOT_FOUND });
        logUtil.handleError({ req, e })
    });
}

exports.create = function (req, res) {
    localPOService.create(req.body).then(result => {
        res.json(result);
    }).catch(err => {
        res.json({ success: false, message: err });
        logUtil.handleError({ req, err })
    })
}

exports.filter = function (req, res) {
    localPOService.filter(req.body)
        .then(result => {
            var response = {
                success: true,
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