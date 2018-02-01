'use strict';

const partPriceService = require('../services/partPriceService');
const redisClient = require('../../commons/redisCache');
const constants = require('../constant/appConstants');
var logUtil = require('../../../tceas-utils/utils/log');

exports.getPaging = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var partPriceKey = "PartPrice" + currentPage + "_" + pageSize;

    console.time("QUERY_TIME")
    redisClient.get(partPriceKey, function (err, data) {
        if (err) {
            return console.log(err);
        }
        if (data) {
            res.json(JSON.parse(data));
        } else {
            // call service to create data
            partPriceService.getPaging(req).then(function (result) {
                var response = { success: 1, data: { count: (result != null) ? result.count : 0, rows: result.rows } };
                redisClient.set(partPriceKey, JSON.stringify(response),
                    function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        redisClient.expire(partPriceKey, constants.REDIS_TIMEOUT);
                    });
                res.json(response);
            }).catch(err => {
                res.json({ success: 0, message: 'error' });
                logUtil.handleError({ req, err })
            });
        }
    });
}

/**
 * Get PartPrice by id
 */
exports.getById = function (req, res) {
    partPriceService.findById(req.params.id).then(function (result) {
        var response = { success: 1, data: result };
        res.json(response);
    }).catch(function (e) {
        res.json({ success: 0, message: 'error' });
        logUtil.handleError({ req, e })
    });
}

/**
 * Create new PartPrice
 */
exports.createPartPrice = function (req, res) {
    return partPriceService.createPartPrice(req.body, res);
}

/**
 * Update PartPrice
 */
exports.updatePartPrice = function (req, res) {
    return partPriceService.updatePartPrice(req.body, res);
}

/**
 * Delete PartPrice by id
 */
exports.deletePartPrice = function (req, res) {
    return partPriceService.deletePartPrice(req.params.id, res);
}