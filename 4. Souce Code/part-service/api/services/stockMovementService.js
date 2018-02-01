'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
const messageConstants = require('../constant/messageConstants');


/**
 * Get matrix by id
 */
exports.findMatrixByModuleCode = function (modulCode) {
    return db.ModuleMovementMatrix.findAll({ 
        include :[{ 
            model : db.PDModuleType, 
            where : {code : modulCode} ,
            require : true
        }],
        attributes: ['sign','movementTypeId'],
        raw : true
    });
}

/**
 * Create Stock Movement
 */
exports.create = function (obj) {
    obj.isDeleted = 0;
    obj.createdDateTime = Date();
    obj.status = 1;
    obj.fulfillmentId = obj.fulfillmentId;
    obj.partId = obj.partId;
    obj.typeId = 1;
    obj.workshopId =obj.workshopId;
    obj.binId = obj.binId;
    obj.grnId = 1;
    obj.adjId =1;
    obj.invoiceId = 1;
    obj.decrease = 2;
    obj.increase = 0;
    // return this.validate(obj, false).then(result => {
    //     if (result && !result.success) {
    //         return Promise.resolve(result);
    //     }
        return db.StockMovement.build(obj).save().then(result => {
            if (result) {
                return { success: true, message: util.format(messageConstants.COMMON_CREATE_SUCCESS, 'Stock Movement') };
            }
            return { success: false, message: util.format(messageConstants.COMMON_CREATE_FAIL, 'Stock Movement') };
        }).catch(err => {
            return Promise.resolve({ success: false, message: err });
        });
    //});
}

/**
 * Update Stock Movement
 */
exports.update = function (obj) {
    return objStockMovement = this.findById(obj.id).then(resultStockMovement => {
        if (resultStockMovement) {
            // return this.validate(obj, true).then(result => {
            //     if (result && !result.success) {
            //         return Promise.resolve(result);
            //     }
                obj.updatedDateTime = Date();
                return resultStockMovement.updateAttributes(obj).then(resultUpdate => {
                    if (resultUpdate) {
                        return Promise.resolve({ success: true, message: util.format(messageConstants.COMMON_UPDATE_SUCCESS, 'Stock Movement') });
                    }
                    return Promise.resolve({ success: false, message: util.format(messageConstants.COMMON_UPDATE_FAIL, 'Stock Movement') });
                });
            //});
        }
    });
}