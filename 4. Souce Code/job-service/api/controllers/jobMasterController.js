'use strict';
const jobMasterService = require('../services/jobMasterService');
const jobTypeService = require('../services/jobTypeService');
const constants = require('../constant/appConstants');
const redisClient = require('../../commons/redisCache');
const Utils = require('../../commons/utils');
var logUtil = require('../../../tceas-utils/utils/log');

exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var jobKey = "jobMaster_" + currentPage + "_" + pageSize;

    console.time("QUERY_TIME")
    redisClient.get(jobKey, function (err, data) {
        if (err) {
            return console.log(err);
        }
        if (data) { //get data from redis cache
            console.log("Data redis")
            console.timeEnd("QUERY_TIME")
            res.json(JSON.parse(data));
        } else {
            jobMasterService.getAll(req.body)
                .then(result => {
                    var response = { success: 1, data: { count: (result != null ? result.count : 0), rows: result.rows } }
                    redisClient.set(jobKey, JSON.stringify(response),
                        function (err) {
                            if (err)
                                return console.log(err);
                            else
                                redisClient.expire(jobKey, 0);
                        });

                    res.json(response);
                })
                .catch(err => {
                    res.json({ success: 0, message: "Error" });
                    logUtil.handleError({ req, err })
                });
        }
    });
}

exports.getAllJobType = function (req, res) {

    var keyGetAllJobType = "getAllJobType";
    redisClient.get(keyGetAllJobType, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }

        if (data) {
            res.json(JSON.parse(data));
        } else {
            jobTypeService.getAllJobType().then(function (result) {
                var response = { success: 1, data: result };

                Utils.setRedisCache(keyGetAllJobType, JSON.stringify(response));
                res.json(response);
            }).catch((err) => {
                let response = { success: 0, data: null, message: err };
                res.json(response);
                logUtil.handleError({ req, err })
            });
        }
    });
}

exports.getListJobByJobGroupId = function (req, res) {
    var jobGroupId = req.params.jobGroupId;
    var vehicleVariantId = req.params.vehicleVariantId;

    var keyGetListJobByJobGroupId = "getListJobByJobGroupId_" + jobGroupId + "_" + vehicleVariantId;
    redisClient.get(keyGetListJobByJobGroupId, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }

        if (data) {
            res.json(JSON.parse(data));
        } else {
            jobMasterService.getListJobByJobGroupId(jobGroupId, vehicleVariantId).then(function (result) {
                var response = { success: 1, data: result };

                Utils.setRedisCache(keyGetListJobByJobGroupId, JSON.stringify(response));
                res.json(response);
            }).catch((err) => {
                let response = { success: 0, data: null, message: err };
                res.json(response);
                logUtil.handleError({ req, err })
            });
        }
    });
}

exports.getById = function (req, res) {
    jobMasterService.getById(req.params.id).then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: "Not found" });
    }).catch(err => {
        res.json({ success: 0, message: "Error" });
        logUtil.handleError({ req, err })
    })
}

exports.getJobWithPriceById = function (req, res) {
    jobMasterService.getById(req.params.id).then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: "Not found" });
    }).catch(err => {
        res.json({ success: 0, message: "Error" });
        logUtil.handleError({ req, err })
    })
}

exports.create = function (req, res) {
    jobMasterService.checkExist(req.body.code).then(result => {
        if (result) {
            return res.json({ success: 0, message: "Existed code" })
        }
        jobMasterService.create(req.body)
            .then(result => {
                res.json({ success: 1, data: result.id });
            })
            .catch(err => {
                res.json({ success: 0, message: "Error" });
                logUtil.handleError({ req, err })
            })
    })
}

exports.update = function (req, res) {
    jobMasterService.update(req.body)
        .then(result => {
            if (result)
                res.json({ success: 1, data: result.id });
            else
                res.json({ success: 0, message: "Not exist" });
        })
        .catch(err => {
            res.json({ success: 0, message: "Error" });
            logUtil.handleError({ req, err })
        })
}

exports.delete = function (req, res) {
    jobMasterService.delete(req.params.id)
        .then(result => {
            if (result)
                res.json({ success: 1, data: result.id });
            else
                res.json({ success: 0, message: "Not exist" });
        })
        .catch(err => {
            res.json({ success: 0, message: "Error" });
            logUtil.handleError({ req, err })
        })
}