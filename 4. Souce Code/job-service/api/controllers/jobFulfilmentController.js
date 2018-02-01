'use strict';
const jobFulfilmentService = require('../services/jobFulfilmentService');
const jobTypeService = require('../services/jobTypeService');
const constants = require('../constant/appConstants');
const redisClient = require('../../commons/redisCache');
const Utils = require('../../commons/utils');
var logUtil = require('../../../tceas-utils/utils/log');

exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var jobFulfilmentKey = "jobFulfilment_" + currentPage + "_" + pageSize;

    console.time("QUERY_TIME")
    redisClient.get(jobFulfilmentKey, function (err, data) {
        if (err) {
            return console.log(err);
        }
        if (data) { //get data from redis cache
            console.log("Data redis")
            console.timeEnd("QUERY_TIME")
            res.json(JSON.parse(data));
        } else {
            jobFulfilmentService.getAll(req.body)
                .then(result => {
                    var response = {
                        success: 1,
                        data: {
                            count: (result != null ? result.count : 0),
                            rows: result.rows
                        }
                    }
                    redisClient.set(jobFulfilmentKey, JSON.stringify(response),
                        function (err) {
                            if (err)
                                return console.log(err);
                            else
                                redisClient.expire(jobFulfilmentKey, 0);
                        });

                    res.json(response);
                })
                .catch(err => {
                    res.json({
                        success: 0,
                        message: "Error"
                    });

                    logUtil.handleError({
                        req,
                        err
                    })
                });
        }
    });
}

exports.getById = function (req, res) {
    jobFulfilmentService.getById(req.params.id).then(result => {
        if (result) {
            return res.json({
                success: true,
                data: result
            })
        }

    }).catch(err => {
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

exports.update = function (req, res) {
    jobFulfilmentService.update(req.body)
        .then(result => {
            if (result)
                res.json({
                    success: 1,
                    data: result.id
                });
            else
                res.json({
                    success: 0,
                    message: "Not exist"
                });
        })
        .catch(err => {
            res.json({
                success: 0,
                message: "Error"
            });
            logUtil.handleError({
                req,
                err
            })
        })
}

exports.getAssignTechnicians = function (req, res) {
    jobFulfilmentService.getAssignTechnicians(req.body)
        .then(result => {
            var response = {
                success: true,
                data: {
                    count: 0, // Todo
                    rows: result
                }
            }
            res.json(response);
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
        });
}

exports.initJobFulfilment = function (req, res) {
    jobFulfilmentService.initJobFulfilment(req.body)
        .then(result => {
            var response = {
                success: true,
                data: result
            }
            res.json(response);
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
        });
}