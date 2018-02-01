'use strict';

const quantityControlService = require('../services/quantityControlService');
const redisClient = require('../../commons/redisCache');
const constants = require('../constant/appConstants');
const Utils = require('../../commons/utils');
var quantityControlKey = "";
var logUtil = require('../../../tceas-utils/utils/log');

exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);

    quantityControlKey = "quantityControl_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;
    redisClient.get(quantityControlKey, function (err, data) {
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
            quantityControlService.getAll(req.body).then(function (result) {
                var response = {
                    success: 1,
                    data: {
                        count: (result != null) ? result.count : 0,
                        rows: result.rows
                    }
                };
                redisClient.set(quantityControlKey, JSON.stringify(response),
                    function (err) {
                        if (err) {
                            let response = {
                                success: 0,
                                data: null,
                                message: err
                            };
                            res.json(response);
                        }
                        redisClient.expire(quantityControlKey, constants.REDIS_TIMEOUT);
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
 * Get JobFFItem by id
 */
exports.getJobFFItem = function (req, res) {
    quantityControlService.getJobFFItem(req.body.id).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}




