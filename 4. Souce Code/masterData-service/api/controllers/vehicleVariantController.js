'use strict';
const vehicleVariantService = require('../services/vehicleVariantService');
const constants = require('../constant/appConstants');
const redisClient = require('../../commons/redisCache');
var logUtil = require('../../../tceas-utils/utils/log');
const Utils = require('../../commons/utils');
var vehicleVariantKey = "";


exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);

    vehicleVariantKey = "vehicleMake_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;
    redisClient.get(vehicleVariantKey, function (err, data) {
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
            vehicleVariantService.getAll(req.body)
            .then(result =>{
                var response = { success: 1, data: { count: (result != null ? result.count : 0), rows: result.rows } }
                redisClient.set(vehicleVariantKey, JSON.stringify(response),
                function (err) {
                    if (err) 
                        return console.log(err);
                    else
                        redisClient.expire(vehicleVariantKey, 0);
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
    vehicleVariantService.getById(req.params.id).then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: "Not found" });
    })
        .catch(err => {
            res.json({ success: 0, message: "Error" });
            logUtil.handleError({ req, err })
        })
}


exports.create = (req, res) => {
    vehicleVariantService.create(req.body).then(result => {
        if (result) {
            Utils.clearRedisCache(vehicleVariantKey);
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
    vehicleVariantService.update(req.body).then(result => {
        if (result) {
            Utils.clearRedisCache(vehicleVariantKey);
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
    vehicleVariantService.delete(req.params.id)
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

exports.getByVehicleId = function (req, res) {
    vehicleVariantService.getByVehicleId(req.params.id)
        .then(result => {
            if (result)
                res.json({ success: true, data: result });
            else
                res.json({ success: false, message: "Not exist" });
        })
        .catch(err => {
            res.json({ success: false, message: "Error" });
            logUtil.handleError({ req, err })
        })
}

exports.getByVehicleModelId = function (req, res) {
    vehicleVariantService.getByVehicleModelId(req.params.id)
    .then(result=>{
        var response = { success: true, data: { count: (result != null ? result.count : 0), rows: result.rows } }
        res.json(response);
    })
    .catch(err=>{
        res.json({ success: 0, message: "Error" });
        logUtil.handleError({ req, err })
    })
}

exports.checkExistCode = function (req, res) {
    vehicleVariantService.isExistCode(req.body.code).then(function (count) {
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

exports.filter = function (req, res) {
    vehicleVariantService.filter(req.body)
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