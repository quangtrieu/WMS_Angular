'use strict';
const partFulfillmentService = require('../services/partFulfillmentService');
const redisClient = require('../../commons/redisCache');
const messageConstants = require('../constant/messageConstants');
const constants = require('../constant/appConstants');
const Utils = require('../../commons/utils');

/**
 * Get all customer by paging
 */
exports.getFulfillment = function (req, res) {
    // calling by service
    partFulfillmentService
        .getFulfill(req.body)
        .then(function (result) {
            let temp = [];
            let parts = req.body.partListId;
            if(parts && parts.indexOf(",") > 0) {
                parts = parts.split(',');
            }
            for (var i = 0; i < parts.length; i++){
                var partobj = {};
                partobj.partId = parts[i];
                var bin = [];
                for (var row in result.rows){
                    if (partobj.partId == result.rows[row]['partId'])
                    {
                        var binobj = {};
                        binobj.code =  result.rows[row]['Bin']['code'];
                        binobj.binId = result.rows[row]['binId'];
                        binobj.quantity = parseInt(result.rows[row]['increase']) - parseInt(result.rows[row]['decrease']);
                        bin.push(binobj);
                    } 
                }
                partobj.bin = bin;
                temp.push(partobj);
            }
            var response = {
                success: true,
                data: {
                    rows: temp
                }
            };            
            res.json(response);
        }).catch(function (error) {
            console.log(error);
        }   
    );
}

/**
 * Create new fulfillment log
 */
exports.create = function (req, res) {
    partFulfillmentService.createStore(req.body)
        .then(result => {
            res.json({ success: true, message: messageConstants.COMMON_CREATE_SUCCESS });
        })
        .catch(err => {
            res.json({ success: false, message: messageConstants.ERROR });
        })
}

/**
 * Update fulfillment log
 */
exports.update = function (req, res) {
    partFulfillmentService.update(req.body)
        .then(result => {
            if (result) {
                res.json({ success: true, data: result.id });
            } else {
                res.json({ success: false, message: messageConstants.NOT_EXIST });
            }
        })
        .catch(err => {
            res.json({ success: false, message: messageConstants.ERROR });
        });
}

/**
 * Get part infomation by partId
 */
exports.getPartInfomation = function (req, res) {
    partFulfillmentService
        .getPartInfomation(req.body)
        .then(function (result) {
            var response = {
                success: true,
                data: result
            };
            res.json(response);
        }).catch(function (error) {
            console.log(error);
        });
}

/**
 * Confirm Picking
 */
exports.confirmPicking = function (req, res) {
    partFulfillmentService
        .confirmPicking(req.body)
        .then(function (result) {
            var response = { success: true, message: messageConstants.SUCCESS };
            res.json(response);
        }).catch(function (error) {
            console.log(error);
        });
}
