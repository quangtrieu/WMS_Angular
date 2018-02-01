'use strict';

const vehicleCustomerService = require('../services/vehicleCustomerService');
const redisClient = require('../../commons/redisCache');
const constants = require('../constant/appConstants');
const messageConstants = require('../constant/messageConstants');
const Utils = require('../../commons/utils');
var logUtil = require('../../../tceas-utils/utils/log');

/**
 * Get VehicleCustomer by vehicleId
 */
exports.getByVehicle = function (req, res) {
  vehicleCustomerService.getByVehicle(req.params.id).then(function (result) {
    var response = { success: true, data: result };
    res.json(response);
  }).catch(function (e) {
    console.log(e);
    res.json({ success: false, message: "error" });
    logUtil.handleError({ req, e })
  });
}

/**
 * Check exist registrationNo
 */
// exports.checkExistRegistrationNo = function (req, res) {
//   vehicleCustomerService.checkExistRegistrationNo(req.body.registrationNo).then(result => {
//     res.json({ success: true, data: result });
//   })
//     .catch(err => {
//       res.json({ success: false, message: messageConstants.VEHICLE_UPDATE_FAIL });
//       logUtil.handleError({ req, err })
//     });

// }

exports.checkExistRegistrationNo = function (req, res) {
    vehicleCustomerService.checkExistRegistrationNo(req.body.registrationNo).then(function (count) {
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
 * Create new VehicleCustomer
 */
exports.create = function (req, res) {
  vehicleCustomerService.checkExistRegistrationNo(req.body.registrationNo).then(result => {
    if (result) {
      return res.json({ success: false, message: messageConstants.EXIST_CUSTOMER })
    }
    vehicleCustomerService.create(req.body)
      .then(result => {
        res.json({ success: true, data: result.id });
      })
      .catch(err => {
        res.json({ success: false, message: messageConstants.ERROR });
        logUtil.handleError({ req, err })
      })
  })
}

/**
 * Update VehicleCustomer
 */
exports.update = function (req, res) {
  vehicleCustomerService.update(req.body)
    .then(result => {
        if (result) {
            res.json({ success: true, message: messageConstants.COMMON_CREATE_SUCCESS, data: result.id });
        } else {
            res.json({ success: false, message: messageConstants.VEHICLE_NOTFOUND });
        }
    })
    .catch(err => {
        res.json({ success: false, message: messageConstants.VEHICLE_UPDATE_FAIL });
        logUtil.handleError({ req, err })
    });
}

/**
 * Delete VehicleCustomer by id
 */
exports.delete = function (req, res) {
  return vehicleCustomerService.delete(req.params.id, res);
}

/**
 * Get RegistrationNO by id
 */
exports.getByNo = function (req, res) {
  vehicleCustomerService.findByNo(req.body).then(function (result) {
    var response = { success: 1, data: result };
    res.json(response);
  }).catch(function (e) {
    console.log(e);
    res.json({ success: 0 });
    logUtil.handleError({ req, e })
  });
}

exports.getVehicleByRegistrationNo = function (req, res) {
  vehicleCustomerService.getVehicleByRegistrationNo(req.params.registrationNo).then(result => {
    if (result) {
      return res.json({ success: true, data: result });
    }
    return res.json({ success: false, message: messageConstants.COMMON_RECORD_NOT_FOUND });
  }).catch(err => {
    res.json({ success: false, message: "Error" });
    logUtil.handleError({ req, err })
  })
}