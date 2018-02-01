'use strict';
const jPCBService = require('../services/jPCBService');
const constants = require('../constant/appConstants');
const redisClient = require('../../commons/redisCache');
const Utils = require('../../commons/utils');
var logUtil = require('../../../tceas-utils/utils/log');

exports.getAllByDate = function (req, res) {
    jPCBService.getAllByDate(req.params.date).then(function (result) {
        var response = {
            success: true,
            data: result
        };
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

exports.createSuggestedBay = function (req, res) {
    jPCBService.createSuggestedBay(req.body)
        .then(result => {
            res.json({
                success: true,
                data: result.id
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: "Error"
            });
            logUtil.handleError({
                req,
                err
            })
        })
}