'use strict';
const vehicleModelService = require('../services/vehicleModelService');
const constants = require('../constant/appConstants');
const redisClient = require('../../commons/redisCache');
var logUtil = require('../../../tceas-utils/utils/log');
const Utils = require('../../commons/utils');
var vehicleModelKey = "";

exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);
    vehicleModelKey = "vehicleModel_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;

    console.time("QUERY_TIME")
    redisClient.get(vehicleModelKey, function (err, data) {
        if (err) {
            return console.log(err);
        }
        if (data) { //get data from redis cache
            console.log("Data redis")
            console.timeEnd("QUERY_TIME")
            res.json(JSON.parse(data));
        } else {
            vehicleModelService.getAll(req.body)
            .then(result =>{
                var response = { success: 1, data: { count: (result != null ? result.count : 0), rows: result.rows } }
                redisClient.set(vehicleModelKey, JSON.stringify(response),
                function (err) {
                    if (err) 
                        return console.log(err);
                    else
                        redisClient.expire(vehicleModelKey, 0);
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
    vehicleModelService.getById(req.params.id).then(function (result) {
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

exports.checkExistCode = function (req, res) {
    vehicleModelService.isExistCode(req.body.code).then(function (count) {
        var response = {
            success: true,
            data: (count != 0 ? true : false)
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

exports.create = (req, res) => {
    vehicleModelService.create(req.body).then(result => {
        if (result) {
            Utils.clearRedisCache(vehicleModelKey);
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



exports.update = function (req, res) {
    vehicleModelService.update(req.body).then(result => {
        if (result) {
            Utils.clearRedisCache(vehicleModelKey);
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

exports.delete = function (req, res) {
    vehicleModelService.delete(req.params.id)
    .then(result=>{
        if(result)
            res.json({ success: 1, data: result.id });
        else
            res.json({ success: 0, message: "Not exist" });
    })
    .catch(err=>{
        res.json({ success: 0, message: "Error" });
        logUtil.handleError({ req, err })
    })
}

exports.getByVehicleMakeId = function (req, res) {
    vehicleModelService.getByVehicleMakeId(req.params.id)
    .then(result=>{
        var response = { success: 1, data: { count: (result != null ? result.count : 0), rows: result.rows } }
        res.json(response);
    })
    .catch(err=>{
        res.json({ success: 0, message: "Error" });
        logUtil.handleError({ req, err })
    })
}

exports.filter = function (req, res) {
    vehicleModelService.filter(req.body)
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
