'use strict';
const timeSlotService = require('../services/timeSlotService');
const constants = require('../constant/appConstants');
const redisClient = require('../../commons/redisCache');
const Utils = require('../../commons/utils');
const messageConstants = require('../constant/messageConstants');
var logUtil = require('../../../tceas-utils/utils/log');

var timeSlot = {};

exports.getTimeSlots = function (req, res) {
    timeSlotService.getTimeSlots(req.params.workShopId)
        .then(result => {
            var response = { success: true, data: result }
            res.json(response);
        })
        .catch(err => {
            res.json({ success: false, message: "Error" });
            logUtil.handleError({ req, err })
        });
}

exports.getByTimeSlotUseId = function (req, res) {
    timeSlotService.getByTimeSlotUseId(req.params.id)
        .then(result => {
            var response = { success: 1, data: result }
            res.json(response);
        })
        .catch(err => {
            res.json({ success: 0, message: "Error" });
            logUtil.handleError({ req, err })
        });
}

exports.getTimeSlotDetailById = function (req, res) {
    timeSlotService.getTimeSlotDetailById(req.params.id)
        .then(result => {
            var response = { success: 1, data: result }
            res.json(response);
        })
        .catch(err => {
            res.json({ success: 0, message: "Error" });
            logUtil.handleError({ req, err })
        });
}

/**
 * Get TimeStart by id
 */
exports.getTimeStart = function (req, res) {
    timeSlotService.findTimeStart(req.body).then(function (result) {
        var response = { success: 1, data: result };
        res.json(response);
    }).catch(function (e) {
        console.log(e);
        res.json({ success: 0 });
        logUtil.handleError({ req, e })
    });
}

/**
 * Get all TSSD
 */
exports.getAllTimeSlotSpecialDay = function (req, res) {

    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var data = JSON.stringify(req.body.data);
    var sort = JSON.stringify(req.body.sortColumn);
    timeSlot = "TimeSlot_" + currentPage + "_" + pageSize + "_" + data + "_" + sort;

    redisClient.get(timeSlot, function (err, data) {
        if (err) {
            let response = { success: 0, data: null, message: err };
            res.json(response);
        }

        // check redis cache data
        if (data) {
            //get data from redis cache
            res.json(JSON.parse(data));
        } else {
            // call service to create data
            timeSlotService.getAllTimeSlotSpecialDay(req.body).then(function (result) {
                var response = { success: 1, data: { count: (result != null) ? result.count : 0, rows: result.rows } };
                Utils.setRedisCache(timeSlot, JSON.stringify(response),
                    function (err) {
                        if (err) {
                            let response = { success: 0, data: null, message: err };
                            res.json(response);
                        }
                        redisClient.expire(timeSlot, 0);
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

/**
 * Create new TimeSlotSpecialDay
 */
exports.createTimeSlotSpecialDay = function (req, res) {
    timeSlotService.createTimeSlotSpecialDay(req.body)
        .then(result => {
            res.json({ success: true, data: result.id });
        })
        .catch(err => {
            res.json({ success: false, message: messageConstants.ERROR });
            logUtil.handleError({ req, err })
        })
}

/**
 * Create new TimeSlotSpecialDay
 */
exports.findTimeSlotMaster = function (req, res) {
    timeSlotService.findAllTimeSlotMaster(req.body)
        .then(result => {
            res.json({ success: true, data: result });
        })
        .catch(err => {
            res.json({ success: false, message: messageConstants.ERROR });
            logUtil.handleError({ req, err })
        })
}

/**
 * Update TimeSlot
 */
exports.updateTimeSlot = function (req, res) {
    timeSlotService.update(req.body).then(result => {
        if (result) {
            res.json({ success: 1, message: messageConstants.SUCCESS });
        } else {
            res.json({ success: 0, message: messageConstants.NOT_EXIST });
        }
    }).catch(err => {
        res.json({ success: false, message: "Error" });
        logUtil.handleError({ req, err })
    })
}

/**
 * Update TimeSlot Detail
 */
exports.updateTimeSlotDetail = function (req, res) {
    timeSlotService.updateTimeSlotDetail(req.body).then(result => {
        if (result) {
            res.json({ success: 1, message: messageConstants.SUCCESS });
        } else {
            res.json({ success: 0, message: messageConstants.NOT_EXIST });
        }
    }).catch(err => {
        res.json({ success: false, message: "Error" });
        logUtil.handleError({ req, err })
    })
}

exports.getTimeSlotSpecialDaysByDateRange = function (req, res) {
    timeSlotService.getTimeSlotSpecialDaysByDateRange(req.body)
        .then(result => {
            var response = { success: true, data: result }
            res.json(response);
        })
        .catch(err => {
            res.json({ success: false, message: "Error" });
            logUtil.handleError({ req, err })
        });
}

exports.getTimeSlotByDate = function (req, res) {
    let indexSpace = req.body.currentDate.indexOf(" ");
    let day = req.body.currentDate.split(" ")[0];
    let date = req.body.currentDate.split(" ")[1];

    // check special date
    timeSlotService.checkSpecialDateByDate(date)
        .then(result => {
            if (result) {
                timeSlotService.getSpecialNameById(result.pdTimeSlotSpecialDayTypeId).then(resultName => {
                    timeSlotService.getTimeSlotByDate(resultName.name).then(objTimeSlot => {
                        var response = { success: true, data: objTimeSlot }
                        res.json(response);
                    })
                })
            } else {
                // xử lý lấy ra ngày của date
                timeSlotService.getTimeSlotByDate(day).then(objTimeSlot => {
                    var response = { success: true, data: objTimeSlot }
                    res.json(response);
                })
            }

        })
        .catch(err => {
            res.json({ success: false, message: "Error" });
            logUtil.handleError({ req, err })
        });
}