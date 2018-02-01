'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
const messageConstants = require('../constant/messageConstants');
const stockMovementService = require('./stockMovementService');

/**
 * Returns a list of vehicleMake
 * @param   {SearchModel}   searchModel - The model search to find
 */
exports.getFulfill = function (searchModel) {
    var array = JSON.parse("[" + searchModel.partListId + "]");
    var filters = {};
    filters.$and = [{ isDeleted: 0 }];
    // let orderby = 'id DESC';
    if (searchModel){
        if (searchModel.workshopId) {
            filters.$and.push({ workshopId: parseInt(searchModel.workshopId) })
        }
        if (searchModel.partListId){
            filters.$and.push({partId: {in: array }})
        }
    }
    return db.StockMovement.findAndCountAll({
        where: filters,
        include: [{
            model: db.PDMovementType,
            where: {code : 'WAQ'},
            required: true
        },
        {
            model: db.Bin,
            attributes: ['id', 'code', 'description'],
            required: true
        }],
        attributes: ['partId', 'binId',[db.StockMovement.sequelize.fn('SUM', db.StockMovement.sequelize.col('increase')), 'increase'],[db.StockMovement.sequelize.fn('SUM', db.StockMovement.sequelize.col('decrease')), 'decrease']],
        group: ['partId','binId'],
    }, { raw: true });
}

exports.create = function (obj) {
    return db.sequelize.transaction(function (t) {
        return stockMovementService.findMatrixByModuleCode('PFN').then(resultMatrix =>  {
            if (resultMatrix){
                var objStockMovementList = [];
                var objPartFulfillment = {};
                objPartFulfillment.isDeleted = 0;
                objPartFulfillment.createdDateTime = Date();
                objPartFulfillment.updatedDateTime = Date();
                objPartFulfillment.status = 1;
                objPartFulfillment.repairOrderPartId = obj.repairOrderPartId;
                objPartFulfillment.fulfillmentQty = obj.fulfillmentQty;
                objPartFulfillment.partId = obj.partId;
                objPartFulfillment.binId = obj.binId;
                objPartFulfillment.workshopId = obj.workshopId;
                objPartFulfillment.roRequestQty = obj.roRequestQty;
                objPartFulfillment.outstandingQty = obj.outstandingQty;
                objPartFulfillment.availableQty = obj.availableQty;
                objPartFulfillment.isSubstitutePart = obj.isSubstitutePart;
                objPartFulfillment.createdBy = obj.createdBy;
                objPartFulfillment.modifiedBy = obj.modifiedBy;

                return db.PartFulfillment.build(objPartFulfillment,{ transaction : t,autocommit: false }).save().then(result => {
                    if (result) {
                        for (var i = 0; i < resultMatrix.length; i++) {
                            var objStockMovement = {};
                            objStockMovement.fulfillmentId = result.id;
                            objStockMovement.partId = obj.partId;
                            objStockMovement.binId = obj.binId;
                            objStockMovement.typeId = resultMatrix[i]["movementTypeId"];
                            objStockMovement.workshopId = obj.workshopId;
                            objStockMovement.createdBy = obj.createdBy;
                            objStockMovement.modifiedBy = obj.modifiedBy;
                            objStockMovement.status = 1;
                            objStockMovement.isDeleted = 0;
                            if (resultMatrix[i]["sign"] == '+') {
                                objStockMovement.decrease = 0;
                                objStockMovement.increase = obj.fulfillmentQty;
                            }
                            else {
                                objStockMovement.decrease = obj.fulfillmentQty;
                                objStockMovement.increase = 0;
                            }
                            objStockMovementList.push(objStockMovement);
                        }
                        return db.StockMovement.bulkCreate(objStockMovementList, { individualHooks: true },{ transaction : t , autocommit : false}).then(result => {
                            if (result) {
                                return t.commit();
                                return { success: true, message: messageConstants.COMMON_CREATE_SUCCESS };
                            }
                        });
                    }
                    else{
                        return t.rollback();
                        return { success: false, message: err };
                    }
                }).catch(err => {
                    return t.rollback();
                    return { success: false, message: err };
                });
            }
        }).catch(err => {
                    return t.rollback();
                    return { success: false, message: err };
                });

    }).then(function(result) {
        return t.commit();
        return { success: true, message: messageConstants.COMMON_CREATE_SUCCESS };
    }).catch(function(err) {
        return t.rollback();
        return { success: false, message: err };
    });
        
  
}

exports.createStore = function (obj) {
    return db.sequelize.query('CALL AddFulfillment(:repairOrderPartIds,:partIds,:binIds,:workshopId,:roRequestQtys,:outstandingQtys,:fulfillmentQtys,:availableQtys,:createdBy,:modifiedBy,:isSubstituteParts,:collectedById,:collectedByName,@result);',{ replacements : { repairOrderPartIds : obj.repairOrderPartId,partIds : obj.partId,binIds: obj.binId,workshopId: obj.workshopId,roRequestQtys: obj.roRequestQty,outstandingQtys: obj.outstandingQty,fulfillmentQtys: obj.fulfillmentQty,availableQtys:obj.availableQty,createdBy:obj.createdBy,modifiedBy:obj.modifiedBy,isSubstituteParts:obj.isSubstitutePart,collectedById:obj.collectedById,collectedByName:obj.collectedByName}}).then(function(response){
        return { success: true, message: messageConstants.COMMON_CREATE_SUCCESS };
     }).error(function(err){
       return { success: false, message: err };
    });
}

exports.getStatusByCode = function (strcode) {
    return db.PDRepairOrderStatus.find({
        where: {
            code: strcode
        }
    }).then(result => {
        if (result) {
            return result.dataValues.id
        }
        else {
            return null;
        }
    }).error(function(err){
        return { success: false, message: err };
     });
}

exports.confirmPicking = function (obj) {
    var task = this.getById(obj.id);
    var repairOrderMaster = {};
    task.then(result => {
        if (result) {
            repairOrderMaster = result.data;
            repairOrderMaster.statusId = this.getStatusByCode('PIC');
            return result.updateAttributes(repairOrderMaster);
        }
    })
    return task;
}

exports.getById = function (id) {
    return db.RepairOrderMaster.find({
        where: {
            id: id
        }
    });
}
var _this = this;
exports.createTest = async function (obj) {
    return db.sequelize.transaction(function (t) {
        return stockMovementService.findMatrixByModuleCode('PFN').then(resultMatrix =>  {
            if (resultMatrix){
                var objStockMovementList = [];
                var objPartFulfillment = {};
                objPartFulfillment.isDeleted = 0;
                objPartFulfillment.createdDateTime = Date();
                objPartFulfillment.updatedDateTime = Date();
                objPartFulfillment.status = 1;
                objPartFulfillment.repairOrderPartId = obj.repairOrderPartId;
                objPartFulfillment.fulfillmentQty = obj.fulfillmentQty;
                objPartFulfillment.partId = obj.partId;
                objPartFulfillment.binId = obj.binId;
                objPartFulfillment.workshopId = obj.workshopId;
                objPartFulfillment.roRequestQty = obj.roRequestQty;
                objPartFulfillment.outstandingQty = obj.outstandingQty;
                objPartFulfillment.availableQty = obj.availableQty;
                objPartFulfillment.isSubstitutePart = obj.isSubstitutePart;
                objPartFulfillment.createdBy = obj.createdBy;
                objPartFulfillment.modifiedBy = obj.modifiedBy;

                return db.PartFulfillment.create(objPartFulfillment,{ transaction : t,autocommit: false })
                .then(result => {
                    if (result) {
                        for (var i = 0; i < resultMatrix.length; i++) {
                            var objStockMovement = {};
                            objStockMovement.fulfillmentId = result.id;
                            objStockMovement.partId = obj.partId;
                            objStockMovement.binId = obj.binId;
                            objStockMovement.typeId = resultMatrix[i]["movementTypeId"];
                            objStockMovement.workshopId = obj.workshopId;
                            objStockMovement.createdBy = obj.createdBy;
                            objStockMovement.modifiedBy = obj.modifiedBy;
                            objStockMovement.status = 1000;
                            objStockMovement.isDeleted = 0;
                            if (resultMatrix[i]["sign"] == '+') {
                                objStockMovement.decrease = 0;
                                objStockMovement.increase = obj.fulfillmentQty;
                            }
                            else {
                                objStockMovement.decrease = obj.fulfillmentQty;
                                objStockMovement.increase = 0;
                            }
                            objStockMovementList.push(objStockMovement);
                        }
                        return _this.createListObj(objStockMovementList,0,t);
                    }
                   
                }).catch(err => {
                    t.rollback();
                    return { success: false, message: err };
                });
            }
        }).catch(err => {
                    return t.rollback();
                    return { success: false, message: err };
                });

    }).then(function(result) {
        return { success: true, message: messageConstants.COMMON_CREATE_SUCCESS };
    });
}


exports.createListObj = function (list,index,t) {
    if (list.length == index ){
        return { success: true, message: messageConstants.COMMON_CREATE_SUCCESS };
    }
    return db.StockMovement.create(list[index], { transaction : t , autocommit : false}).then(result => {
        if (result) {
            return this.createListObj(list,index + 1,t);
        }
    }).catch(err => {
        return t.rollback();
        return { success: false, message: err };
    });
}