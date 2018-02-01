'use strict';
const serviceAdvisorService = require('../services/serviceAdvisorService');
const constants = require('../constant/appConstants');
const redisClient = require('../../commons/redisCache');
var logUtil = require('../../../tceas-utils/utils/log');

exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var serviceAdvisorKey = "serviceAdvisor_" + currentPage + "_" + pageSize;

    console.time("QUERY_TIME")
    redisClient.get(serviceAdvisorKey, function (err, data) {
        if (err) {
            return console.log(err);
        }
        if (data) { //get data from redis cache
            console.log("Data redis")
            console.timeEnd("QUERY_TIME")
            res.json(JSON.parse(data));
        } else {
            serviceAdvisorService.getAll(req.body)
                .then(result => {
                    var response = { success: true, data: { count: (result != null ? result.count : 0), rows: result.rows } }
                    redisClient.set(serviceAdvisorKey, JSON.stringify(response),
                        function (err) {
                            if (err)
                                return console.log(err);
                            else
                                redisClient.expire(serviceAdvisorKey, 0);
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

exports.getById = function (req, res) {
    serviceAdvisorService.getById(req.params.id).then(result => {
        if (result) {
            return res.json({ success: true, data: result })
        }
        return res.json({ success: false, message: "Not found" });
    })
    .catch(err => {
        res.json({ success: false, message: "Error" });
        logUtil.handleError({ req, err })
    })
}

exports.create = function (req, res) {
    serviceAdvisorService.create(req.body)
        .then(result => {
            return res.json(result);
        })
        .catch(err => {
            res.json({ success: false, message: "Error" });
            logUtil.handleError({ req, err })
        })
}

exports.update = function (req, res) {
    serviceAdvisorService.update(req.body)
        .then(result => {
            if (result)
                res.json({ success: true, data: result });
            else
                res.json({ success: false, message: "Error" });
        })
        .catch(err => {
            res.json({ success: false, message: "Error" });
            logUtil.handleError({ req, err })
        })
}

exports.delete = function (req, res) {
    serviceAdvisorService.delete(req.params.id)
        .then(result => {
            if (result)
                res.json({ success: true, data: result.id });
            else
                res.json({ success: false, message: "Not exist" });
        })
        .catch(err => {
            res.json({ success: false, message: "Error" });
            logUtil.handleError({ req, err })
        })
}