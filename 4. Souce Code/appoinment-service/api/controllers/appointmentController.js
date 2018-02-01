'use strict';
const appointmentService = require('../services/appointmentService');
var apiResponse = require('../../../tceas-utils/models/apiResponse');
var asyncMiddleware = require('../../../tceas-utils/middleware/async');

exports.getById = asyncMiddleware(async (req, res, next) => {
    var app = await appointmentService.getFullAppointmentById(req.params.id);
    var result = apiResponse.success(app);
    res.json(result);
})

exports.getAll = asyncMiddleware(async (req, res, next) => {
    var app = await appointmentService.getAll(req.body);
    var result = apiResponse.success(app);
    res.json(result);
});

exports.getAllAppointmentByRegistrationNo = asyncMiddleware(async (req, res, next) => {
    var workShopId = req.params.workShopId;
    var registrationNo = req.params.registrationNo;

    var app = await appointmentService.getAllAppointmentByRegistrationNo(workShopId, registrationNo);
    var result = apiResponse.success(app);
    res.json(result);
});

exports.create = asyncMiddleware(async (req, res, next) => {
    var result = await appointmentService.create(req.body);
    if (result.success) {
        return res.json(apiResponse.success(result.data, result.message));
    }
    return res.json(apiResponse.error(result.message));
})

exports.update = asyncMiddleware(async (req, res, next) => {
    var result = await appointmentService.update(req.body)
    if (result.success) {
        return res.json(apiResponse.success(result.data, result.message));
    }
    return res.json(apiResponse.error(result.message));
})

exports.delete = function (req, res, next) {
    appointmentService.delete(req.params.id)
        .then(result => {
            data.updatedDateTime = new Date();
            data.isDeleted = 1;
            event.publish("event_Appointment_Deleted_Success", req.body);
            event.subscribe("event_Appointment_Ready_Query",
                function () {
                    res.json({
                        success: true,
                        data: result.id
                    });
                }
            )
        })
        .catch(err => {
            next(err, req, res);
        })
}

exports.getTimeSlotDetailUses = function (req, res, next) {
    appointmentService.getTimeSlotDetailUses(req.body)
        .then(result => {
            res.json({
                success: true,
                data: result
            });
        })
        .catch(err => {
            next(err, req, res);
        })
}

/**
 * Get VehicleCustomerId by id
 */
exports.getByNo = function (req, res, next) {
    appointmentService.findByNo(req.body).then(function (result) {
        var response = {
            success: 1,
            data: result
        };
        res.json(response);
    }).catch(err => {
        next(err, req, res);
    });
}

/**
 * Get appointment by timeslot
 */
exports.getByTimeSlot = function (req, res, next) {
    appointmentService.getByTimeSlot(req.body).then(function (result) {
        var response = {
            success: true,
            data: result
        };
        res.json(response);
    }).catch(err => {
        next(err, req, res);
    });
}