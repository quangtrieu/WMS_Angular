'use strict';

const quantityControlService = require('../services/quantityControlService');
const redisClient = require('../../commons/redisCache');
const constants = require('../constant/appConstants');
const Utils = require('../../commons/utils');
var vehicleMakeKey = "";
var logUtil = require('../../../tceas-utils/utils/log');

/**
 * Get All Inspection
 */
exports.getInspectionCheckList = function (req, res) {
    quantityControlService.findInspectionCL().then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}

/**
 * Get InspectionValue by id
 */
exports.getPDInspectionValue = function (req, res) {
    quantityControlService.findPDInspectionValue().then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}

/**
 * create
 */
exports.create = function (req, res) {
    quantityControlService.create(req.body).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}

/**
 * Get All Inspection
 */
exports.findInspectionCheckList = function (req, res) {
    quantityControlService.getInspectionCL().then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}

/**
 * chkExistInspectionQC by ROid
 */
exports.chkExistInspectionQC = function (req, res) {
    quantityControlService.chkExistInspectionQC(req.body.id).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}

/**
 * update JobFFItem by id
 */
exports.updateJobFFItem = function (req, res) {
    quantityControlService.updateJobFFItem(req.body).then(function (result) {
        var response = { success: true, data: result };
        res.json(response);
    }).catch(function (err) {
        let response = { success: 0, data: null, message: err };
        res.json(response);
        logUtil.handleError({ req, err })
    });
}