'use strict';

const repairOrderPartService = require('../services/repairOrderPartService');
const redisClient = require('../../commons/redisCache');
const messageConstants = require('../constant/messageConstants');
const Utils = require('../../commons/utils');
var logUtil = require('../../../tceas-utils/utils/log');

var repairOrderPartKey = {};

/**
 * Get all customer by paging
 */
exports.getAll = function (req, res) {

    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);
    repairOrderPartKey = "ROPart_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;

    redisClient.get(repairOrderPartKey, function (err, data) {
        if (err) {
            return console.log(err);
        }

        // check redis cache data
        if (data) {
            //get data from redis cache
            res.json(JSON.parse(data));
        } else {
            // call service to create data
            repairOrderPartService
                .getAll(req.body)
                .then(function (result) {
                    var response = {
                        success: true,
                        data: result
                    };
                    Utils.setRedisCache(repairOrderPartKey, JSON.stringify(response));
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
 * Get by id
 */
exports.getByROId = function (req, res) {
    repairOrderPartService.getByROId(req.query.roId).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (e) {
        console.log(e);
        res.json({ success: false, message: messageConstants.COMMON_RECORD_NOT_FOUND });
        logUtil.handleError({ req, e })
    });
}