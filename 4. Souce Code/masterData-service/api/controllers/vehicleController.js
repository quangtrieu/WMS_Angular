'use strict';

const vehicleService = require('../services/vehicleService');
const customerService = require('../services/customerService');
const vehicleCustomerService = require('../services/vehicleCustomerService');
const redisClient = require('../../commons/redisCache');
const constants = require('../constant/appConstants');
const messageConstants = require('../constant/messageConstants');
const Utils = require('../../commons/utils');
const vehicleController = require('../controllers/vehicleController');
var logUtil = require('../../../tceas-utils/utils/log');

var vehicleKey = {};

/**
 * Get all vehicle by paging
 */
exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);

    vehicleKey = "vehicle_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;
    redisClient.get(vehicleKey, function (err, data) {
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
            vehicleService.getAll(req.body).then(function (result) {
                var response = {
                    success: 1,
                    data: {
                        count: (result != null) ? result.count : 0,
                        rows: result.rows
                    }
                };
                redisClient.set(vehicleKey, JSON.stringify(response),
                    function (err) {
                        if (err) {
                            let response = {
                                success: 0,
                                data: null,
                                message: err
                            };
                            res.json(response);
                        }
                        redisClient.expire(vehicleKey, constants.REDIS_TIMEOUT);
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

exports.checkExistChassisNo = function (req, res) {
    vehicleService.isExistChassisNo(req.params.chassisNo).then(function (count) {
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
/**
 * Get vehicle by id
 */
exports.getById = function (req, res) {
    vehicleService.getById(req.params.id).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (e) {
        console.log(e);
        res.json({ success: false, message: messageConstants.COMMON_RECORD_NOT_FOUND });
        logUtil.handleError({ req, e })
    });
}

/**
 * Get vehicle by vinNo
 */
exports.getByVinNo = function (req, res) {
    vehicleService.getByVinNo(req.body.vinNo, req.body.variantId)
        .then(result => {
            res.json({ success: true, data: result });
        })
        .catch(err => {
            res.json({ success: false, message: messageConstants.COMMON_RECORD_NOT_FOUND });
            logUtil.handleError({ req, error })
        });
}

/**
 * Create vehicle
 */
exports.create = function (req, res) {

    if (req.body.customer.id) {
        vehicleController.createVehicle(req, res);
    } else {
        customerService
            .create(req.body.customer)
            .then(resultCustomer => {
                req.body.customer.id = resultCustomer.id;
                vehicleController.createVehicle(req, res);
            }).catch(err => {
                res.json({ success: false, message: messageConstants.COMMON_RECORD_NOT_FOUND });
                logUtil.handleError({ req, error })
            });
    }
}

/**
 * Create new vehicle
 */
exports.createVehicle = function (req, res) {
    vehicleService.getByVinNo(req.body.vinNo, req.body.vehicleVariantId).then(result => {
        if (result) {
            return res.json({ success: false, message: messageConstants.VEHICLE_EXIST_VIN_NO })
        }
        vehicleService.create(req.body).then(resultVehicle => {
            if (resultVehicle.success) {
                vehicleController.createVehicleCustomer(req, res, resultVehicle.data, req.body.customer.id)
            } else {
                res.json(resultVehicle);
            }
        })
            .catch(err => {
                console.log(err);
                res.json({ success: false, message: util.format(messageConstants.COMMON_CREATE_FAIL, 'vehicle') });
                logUtil.handleError({ req, error })
            });
    });
}

/**
 * Create vehicle customer
 */
exports.createVehicleCustomer = function (req, res, vehicleId, customerId) {
    let vehicleCustomer = {};
    vehicleCustomer.customerId = customerId;
    vehicleCustomer.vehicleId = vehicleId;
    vehicleCustomer.registrationNo = req.body.registrationNo;
    vehicleCustomer.isOwner = 1;

    // insert into vehicleCustomer
    vehicleCustomerService.create(vehicleCustomer)
        .then(resultVehicleCustomer => {
            Utils.clearRedisCache(vehicleKey);
            res.json(resultVehicleCustomer);
        }).catch(err => {
            res.json({ success: false, message: "Error" });
            logUtil.handleError({ req, error })
        });
}

/**
 * Update vehicle
 */
exports.update = function (req, res) {
    vehicleService.update(req.body)
        .then(result => {
            if (result) {
                Utils.clearRedisCache(vehicleKey);
                res.json({ success: true, message: messageConstants.VEHICLE_UPDATE_SUCCESS, data: result.id });
            } else {
                res.json({ success: false, message: messageConstants.VEHICLE_NOTFOUND });
            }
        })
        .catch(err => {
            res.json({ success: false, message: messageConstants.VEHICLE_UPDATE_FAIL });
            logUtil.handleError({ req, error })
        })
}

/**
 * Delete vehicle by id
 */
exports.delete = function (req, res) {
    if (req.params.id.indexOf(",") > 0) {
        vehicleService.deletes(req.params.id)
            .then(result => {
                if (result) {
                    Utils.clearRedisCache(vehicleKey);
                    res.json({ success: true });
                } else {
                    res.json({ success: false, message: messageConstants.ERROR });
                }
            })
            .catch(err => {
                res.json({ success: false, message: messageConstants.ERROR });
                logUtil.handleError({ req, error })
            });
    } else {
        vehicleService.delete(req.params.id)
            .then(result => {
                if (result) {
                    Utils.clearRedisCache(vehicleKey);
                    res.json({ success: true });
                } else {
                    res.json({ success: false, message: messageConstants.VEHICLE_NOTFOUND });
                }
            })
            .catch(err => {
                res.json({ success: false, message: messageConstants.ERROR });
                logUtil.handleError({ req, error })
            }
            );
    }
}

/**
 * Get vehicle by registrationNo, vinNo
 */
exports.getByNo = function (req, res) {
    vehicleService.getByNo(req.body.registrationNo, req.body.vinNo).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (e) {
        console.log(e);
        res.json({ success: false, message: messageConstants.COMMON_RECORD_NOT_FOUND });
        logUtil.handleError({ req, error })
    });
}

exports.getByVehicleCustomerId = function (req, res) {
    vehicleService.getByVehicleCustomerId(req.params.id).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (e) {
        console.log(e);
        res.json({ success: false, message: messageConstants.VEHICLE_NOTFOUND });
        logUtil.handleError({ req, error })
    });
}

exports.getVehicleByChassisNo = function (req, res) {
  vehicleService.getVehicleByChassisNo(req.params.chassisNo).then(result => {
    if (result) {
      return res.json({ success: true, data: result });
    }
    return res.json({ success: false, message: messageConstants.COMMON_RECORD_NOT_FOUND });
  }).catch(err => {
    res.json({ success: false, message: "Error" });
    logUtil.handleError({ req, err })
  })
}

