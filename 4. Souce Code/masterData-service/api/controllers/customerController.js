'use strict';

const customerService = require('../services/customerService');
const pdService = require('../services/pdService');
const redisClient = require('../../commons/redisCache');
const messageConstants = require('../constant/messageConstants');
const Utils = require('../../commons/utils');
var logUtil = require('../../../tceas-utils/utils/log');
const constants = require('../constant/appConstants');

var customerKey = {};

/**
 * Get all customer by paging
 */

exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);

    customerKey = "customer_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;
    redisClient.get(customerKey, function (err, data) {
        if (err) {
            let response = {
                success: false,
                data: null,
                message: err
            };
            res.json(response);
        }
        if (data) {
            res.json(JSON.parse(data)); //get data from redis cache
        } else {
            customerService.getAll(req.body).then(function (result) {
                var response = {
                    success: true,
                    data: {
                        count: (result != null) ? result.count : 0,
                        rows: result.rows
                    }
                };
                redisClient.set(customerKey, JSON.stringify(response),
                    function (err) {
                        if (err) {
                            let response = {
                                success: false,
                                data: null,
                                message: err
                            };
                            res.json(response);
                        }
                        redisClient.expire(customerKey, constants.REDIS_TIMEOUT);
                    });
                res.json(response);
            }).catch((err) => {
                let response = {
                    success: false,
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
 * Create new customer
 */
exports.create = (req, res) => {
    customerService.create(req.body).then(result => {
        if (result) {
            Utils.clearRedisCache(customerKey);
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
 * Update customer
 */
exports.update = function (req, res) {
    customerService.update(req.body).then(result => {
        if (result) {
            Utils.clearRedisCache(customerKey);
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

/**
 * Delete customer by id
 */
exports.delete = function (req, res) {
    if (req.params.id.indexOf(",") > 0) {
        customerService.deletes(req.params.id)
            .then(result => {
                if (result) {
                    Utils.clearRedisCache(customerKey);
                    res.json({ success: true });
                } else {
                    res.json({ success: false, message: messageConstants.ERROR });
                }
            })
            .catch(err => {
                res.json({ success: false, message: err });
                logUtil.handleError({ req, err })
            }
            );
    } else {
        customerService.delete(req.params.id)
            .then(result => {
                if (result) {
                    Utils.clearRedisCache(customerKey);
                    res.json({ success: true });
                } else {
                    res.json({ success: false, message: messageConstants.NOT_EXIST });
                }
            })
            .catch(err => {
                res.json({ success: false, message: messageConstants.ERROR });
                logUtil.handleError({ req, err })
            }
            );
    }
}


/**
 * Get customer by id
 */
exports.getById = function (req, res) {
    customerService.getById(req.params.id).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        console.log(err);
        logUtil.handleError({ req, err })
    });
}

/**
 * Get customer by code
 */
exports.getByCode = function (req, res) {
    customerService.getByCode(req.body.code)
        .then(result => {
            res.json({ success: true, data: result });
        })
        .catch(err => {
            res.json({ success: false, message: messageConstants.EXIST_CUSTOMER });
            logUtil.handleError({ req, err })
        });
}

/**
 * Get pd data
 */
exports.getAllPDData = function (req, res) {
    return Promise.all([
        pdService.getData("country"),
        pdService.getData("idType"),
        pdService.getData("race"),
        pdService.getData("salutation"),
        pdService.getData("occupation"),
        pdService.getData("employeeStatus"),
    ])
        .then(function (result) {
            let data = {};
            data.country = result[0];
            data.idType = result[1];
            data.race = result[2];
            data.salutation = result[3];
            data.occupation = result[4];
            data.employeeStatus = result[5];
            var response = {
                success: true,
                data: data
            };
            res.json(response);
        })
        .catch(err => {
            console.log('failed!')
            logUtil.handleError({ req, err })
        });
}