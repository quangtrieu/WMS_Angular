'use strict';

const jobPartService = require('../services/jobPartService');
const redisClient = require('../../commons/redisCache');
const constants = require('../constant/appConstants');
const Utils = require('../../commons/utils');
const messageConstants = require('../constant/messageConstants');
var jobPartMasterKey = "";
var logUtil = require('../../../tceas-utils/utils/log');

exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);

    jobPartMasterKey = "jobPartMaster_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;
    redisClient.get(jobPartMasterKey, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }
        if (data) {
            res.json(JSON.parse(data)); //get data from redis cache
        } else {
            jobPartService.getAll(req.body).then(function (result) {
                var response = { success: 1, data: { count: (result != null) ? result.count : 0, rows: result.rows } };
                redisClient.set(jobPartMasterKey, JSON.stringify(response),
                    function (err) {
                        if (err) {
                            let response = { success: 0, data: null, message: err };
                            res.json(response);
                        }
                        redisClient.expire(jobPartMasterKey, constants.REDIS_TIMEOUT);
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

exports.getById = function (req, res) {
    jobPartService.getById(req.body.jobPartId, req.body.partId).then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: err });
    }).catch(err => {
        res.json({ success: 0, message: err });
        logUtil.handleError({ req, err })
    })
}

exports.getByJobId = function (req, res) {
    jobPartService.getByJobId(req.body.jobPartId).then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: err });
    }).catch(err => {
        res.json({ success: 0, message: err });
        logUtil.handleError({ req, err })
    })
}

exports.getVehicleMake = function (req, res) {
    jobPartService.getVehicleMake().then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: err });
    }).catch(err => {
        res.json({ success: 0, message: err });
        logUtil.handleError({ req, err })
    })
}

exports.getVehicleModel = function (req, res) {
    jobPartService.getVehicleModel(req.body.id).then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: err });
    }).catch(err => {
        res.json({ success: 0, message: err });
        logUtil.handleError({ req, err })
    })
}

exports.getVehicleVariant = function (req, res) {
    jobPartService.getVehicleVariant(req.body.id).then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: err });
    }).catch(err => {
        res.json({ success: 0, message: err });
        logUtil.handleError({ req, err })
    })
}

exports.getAllVehicleModel = function (req, res) {
    jobPartService.getAllVehicleModel().then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: err });
    }).catch(err => {
        res.json({ success: 0, message: err });
        logUtil.handleError({ req, err })
    })
}

exports.getAllVehicleVariant = function (req, res) {
    jobPartService.getAllVehicleVariant().then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: err });
    }).catch(err => {
        res.json({ success: 0, message: err });
        logUtil.handleError({ req, err })
    })
}

exports.getLastestJobPartMaster = function (req, res) {
    jobPartService.getLastestJobPartMasterId().then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: err });
    }).catch(err => {
        res.json({ success: 0, message: err });
        logUtil.handleError({ req, err })
    })
}

exports.update = function (req, res) {
    jobPartService.update(req.body).then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: err });
    }).catch(err => {
        res.json({ success: 0, message: err });
        logUtil.handleError({ req, err })
    })
}

exports.getJobMaster = function (req, res) {
    jobPartService.getJobMaster().then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: err });
    }).catch(err => {
        res.json({ success: 0, message: err });
        logUtil.handleError({ req, err })
    })
}

exports.getPartMaster = function (req, res) {
    jobPartService.getPartMaster().then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: err });
    }).catch(err => {
        res.json({ success: 0, message: err });
        logUtil.handleError({ req, err })
    })
}

exports.getByJobIdAndVariantId = (req, res) => {
    var jobId = req.params.jobId;
    var vehicleVariantId = req.params.vehicleVariantId;

    jobPartService.getByJobIdAndVariantId(jobId, vehicleVariantId).then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: err });
    }).catch(err => {
        res.json({ success: 0, message: err });
        logUtil.handleError({ req, err })
    })
}

exports.create = function (req, res) {
    jobPartService.create(req.body).then(result => {
        if (result) {
            return res.json({ success: 1, data: result })
        }
        return res.json({ success: 0, message: err });
    }).catch(err => {
        res.json({ success: 0, message: err });
        logUtil.handleError({ req, err })
    })
}