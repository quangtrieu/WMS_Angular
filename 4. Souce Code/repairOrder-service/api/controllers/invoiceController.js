'use strict';

const invoiceService = require('../services/invoiceService');
const redisClient = require('../../commons/redisCache');
const constants = require('../constant/appConstants');
const Utils = require('../../commons/utils');
var invoiceKey = "";
var logUtil = require('../../../tceas-utils/utils/log');

exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);

    invoiceKey = "invoice_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;
    redisClient.get(invoiceKey, function (err, data) {
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
            invoiceService.getAll(req.body).then(function (result) {
                var response = {
                    success: 1,
                    data: {
                        count: (result != null) ? result.count : 0,
                        rows: result.rows
                    }
                };
                redisClient.set(invoiceKey, JSON.stringify(response),
                    function (err) {
                        if (err) {
                            let response = {
                                success: 0,
                                data: null,
                                message: err
                            };
                            res.json(response);
                        }
                        redisClient.expire(invoiceKey, constants.REDIS_TIMEOUT);
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
    invoiceService.findById(req.params.id).then(function (result) {
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

exports.filter = function (req, res) {
    invoiceService.filter(req.body)
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

/**
 * Get Invoice by id
 */
exports.getInvoiceById = function (req, res) {
    invoiceService.getById(req.body.id).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}

/**
 * Get RO by id
 */
exports.getROById = function (req, res) {
    invoiceService.getROById(req.body.code).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}

exports.create = function (req, res) {
    invoiceService.create(req.body).then(result => {
        res.json(result);
    }).catch(err => {
        res.json({ success: false, message: err });
        logUtil.handleError({ req, err })
    })
}