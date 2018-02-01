'use strict';
const repairOrderService = require('../services/repairOrderService');
const partTypeService = require('../services/partTypeService');
const jobSourceService = require('../services/jobSourceService');
const comeBackJobService = require('../services/comeBackJobService');
const paymentTypeService = require('../services/paymentTypeService');
const partSourceService = require('../services/partSourceService');
const constants = require('../constant/appConstants');
const redisClient = require('../../commons/redisCache');
const Utils = require('../../commons/utils');
var logUtil = require('../../../tceas-utils/utils/log');

var repairOrderKey = {};

exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);
    repairOrderKey = "RepairOrder" + currentPage + "_" + pageSize + "_" + data + "_" + sort;

    redisClient.get(repairOrderKey, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }
        if (data) {
            res.json(JSON.parse(data));
        } else {
            // call service to create data
            repairOrderService.getAll(req.body).then(function (result) {
                var response = { success: 1, data: { count: (result != null) ? result.count : 0, rows: result.rows } };
                Utils.setRedisCache(repairOrderKey, JSON.stringify(response),
                    function (err) {
                        if (err) {
                            let response = { success: 0, data: null, message: err };
                            res.json(response);
                        }
                        redisClient.expire(repairOrderKey, constants.REDIS_TIMEOUT);
                    });
                res.json(response);
            }).catch((err) => {
                let response = { success: 0, data: null, message: err };
                res.json(response);
                logUtil.handleError({ req, err })
            });
        }
    });
}

exports.getAllPartType = function (req, res) {

    var keyGetAllPartType = "getAllPartType";
    redisClient.get(keyGetAllPartType, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }

        if (data) {
            res.json(JSON.parse(data));
        } else {
            partTypeService.getAllPartType().then(function (result) {
                var response = { success: 1, data: result };

                Utils.setRedisCache(keyGetAllPartType, JSON.stringify(response));
                res.json(response);
            }).catch((err) => {
                let response = { success: 0, data: null, message: err };
                res.json(response);
                logUtil.handleError({ req, err })
            });
        }
    });
}

exports.getAllJobSource = function (req, res) {

    var keyGetAllJobSource = "getAllJobSource";
    redisClient.get(keyGetAllJobSource, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }

        if (data) {
            res.json(JSON.parse(data));
        } else {
            jobSourceService.getAllJobSource().then(function (result) {
                var response = { success: 1, data: result };

                Utils.setRedisCache(keyGetAllJobSource, JSON.stringify(response));
                res.json(response);
            }).catch((err) => {
                let response = { success: 0, data: null, message: err };
                res.json(response);
                logUtil.handleError({ req, err })
            });
        }
    });
}


exports.getAllPartSource = function (req, res) {
    var keyGetAllPartSource = "getAllPartSource";
    redisClient.get(keyGetAllPartSource, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }

        if (data) {
            res.json(JSON.parse(data));
        } else {
            partSourceService.getAllPartSource().then(function (result) {
                var response = { success: 1, data: result };

                Utils.setRedisCache(keyGetAllPartSource, JSON.stringify(response));
                res.json(response);
            }).catch((err) => {
                let response = { success: 0, data: null, message: err };
                res.json(response);
                logUtil.handleError({ req, err })
            });
        }
    });
}


exports.getAllComebackJob = function (req, res) {
    var keyGetAllComebackJob = "getAllComebackJob";
    redisClient.get(keyGetAllComebackJob, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }

        if (data) {
            res.json(JSON.parse(data));
        } else {
            comeBackJobService.getAllComebackJob().then(function (result) {
                var response = { success: 1, data: result };

                Utils.setRedisCache(keyGetAllComebackJob, JSON.stringify(response));
                res.json(response);
            }).catch((err) => {
                let response = { success: 0, data: null, message: err };
                res.json(response);
                logUtil.handleError({ req, err })
            });
        }
    });
}

exports.getAllPaymentType = function (req, res) {

    var keyGetAllPaymentType = "getAllPaymentType";
    redisClient.get(keyGetAllPaymentType, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }

        if (data) {
            res.json(JSON.parse(data));
        } else {
            paymentTypeService.getAllPaymentType().then(function (result) {
                var response = { success: 1, data: result };

                Utils.setRedisCache(keyGetAllPaymentType, JSON.stringify(response));
                res.json(response);
            }).catch((err) => {
                let response = { success: 0, data: null, message: err };
                res.json(response);
                logUtil.handleError({ req, err })
            });
        }
    });
}

exports.getAllPDType = function (req, res) {
    var promise1 = paymentTypeService.getAllPaymentType();
    var promise2 = partSourceService.getAllPartSource();
    var promise3 = jobTypeService.getAllJobType();

    var arraypromise = [];
    arraypromise.push(promise1);
    arraypromise.push(promise2);
    arraypromise.push(promise3);

    return Promise.all(arraypromise);
}

exports.getById = function (req, res) {
    repairOrderService.getById(req.params.id).then(result => {
        if (result) {
            return res.json({ success: true, data: result })
        }
        return res.json({ success: false, message: "Not found" });
    }).catch(err => {
        res.json({ success: false, message: "Error" });
        logUtil.handleError({ req, err })
    })
}

exports.getFullRepairOrderById = function (req, res) {
    repairOrderService.getFullRepairOrderById(req.params.id).then(result => {
        if (result) {
            return res.json({ success: true, data: result })
        }
        return res.json({ success: false, message: "Not found" });
    }).catch(err => {
        res.json({ success: false, message: "Error" });
        logUtil.handleError({ req, err })
    });
}

exports.create = function (req, res) {
    repairOrderService.create(req.body).then(result => {
        res.json(result);
    }).catch(err => {
        res.json({ success: false, message: "Error" });
        logUtil.handleError({ req, err })
    })
}

exports.update = function (req, res) {
    repairOrderService.update(req.body).then(result => {
        if (result)
            res.json(result);
        else
            res.json({ success: false, message: "Not exist" });
    }).catch(err => {
        res.json({ success: false, message: "Error" });
        logUtil.handleError({ req, err })
    })
}

exports.delete = function (req, res) {
    repairOrderService.delete(req.params.id)
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

/**
 * Get RegistrationNO by id
 */
exports.getByNo = function (req, res) {
    repairOrderService.findByNo(req.body).then(function (result) {
        var response = { success: 1, data: result };
        res.json(response);
    }).catch(function (e) {
        console.log(e);
        res.json({ success: 0 });
        logUtil.handleError({ req, e })
    });
}

exports.getRepairOrderJobs = function (req, res) {
    repairOrderService.getRepairOrderJobs(req.params.id)
        .then(result => {
            if (result)
                res.json({ success: 1, data: result });
            else
                res.json({ success: 0, message: "Not exist" });
        })
        .catch(err => {
            res.json({ success: 0, message: "Error" });
            logUtil.handleError({ req, err })
        })
}

exports.getRepairOrderHistories = function (req, res) {
    repairOrderService.getRepairOrderHistories(req.params.vehicleCustomerId)
        .then(result => {
            res.json({ success: 1, data: result });
        })
        .catch(err => {
            res.json({ success: 0, message: "Error" });
            logUtil.handleError({ req, err })
        })
}