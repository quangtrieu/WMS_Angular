'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
const messageConstants = require('../constant/messageConstants');
const util = require('util');

/**
 * Get all InspectionCheckList by id
 */
exports.findInspectionCL = function (id) {
    return db.InspectionMaster.findAll({
        include: [
            { model: db.InspectionItem },
        ]
    });
}

exports.findPDInspectionValue = function () {
    return db.PdInspectionValue.findAll({});
}

exports.create = function (item) {
    return this.chkExistInspectionQC(item.id).then(result => {
        if (result.length != 0) {
            //update
            item.data.forEach(element => {
                var update = db.InspectionQC.find({
                    where: {
                        inspectionCheckListItemId: element.id
                    }
                })
                var updateData = {}
                update.then(result => {
                    if (result) {
                        updateData.pdInspectionValueId = element.role
                        result.updateAttributes(updateData);
                    }
                })
            })
            return Promise.resolve(true);
        } else {
            //create
            var obj = []
            item.data.forEach(element => {
                var subObj = {}
                subObj.repairOrderId = item.id
                subObj.inspectionCheckListItemId = element.id
                subObj.pdInspectionValueId = element.role
                subObj.createdDateTime = Date()
                subObj.updatedDateTime = Date()
                subObj.isDeleted = 0
                obj.push(subObj)
            })
            db.InspectionQC.bulkCreate(obj)
            return Promise.resolve(true);
        }
    })

}

/**
 * Get all InspectionCheckList by id
 */
exports.getInspectionCL = function () {
    return db.InspectionCheckList.findAll({
        include: [
            { model: db.InspectionCheckListItem },
        ]
    });
}

/**
 * Get all InspectionQC by ROid
 */
exports.getInspectionQC = function (id) {
    // return db.InspectionQC.findAll({ 
    //     where: {
    //         repairOrderId: id,
    //     },
    //     include: [
    //         { model: db.InspectionCheckListItem },
    //         { model: db.PdInspectionValue },
    //     ]
    //  });
    return this.chkExistInspectionQC(id).then(result => {
        if (result) {

        } else {

        }
    })

}

/**
 * check exist InspectionQC by ROid
 */
exports.chkExistInspectionQC = function (item) {
    var obj = db.InspectionQC.findAll({
        where: {
            repairOrderId: item
        }
    });
    return obj.then(result => {
        if (result) {
            return result
        } else {
            return Promise.resolve(false);
        }
    })
}

/**
 * Get update JobFFItem by id
 */
exports.updateJobFFItem = function (item) {
    item.forEach(element => {
        var obj = db.JobFulfilmentItem.find({
            where: {
                id: element.id
            }
        });
        var updateData = {}
        obj.then(result => {
            if (result) {
                updateData.jobFulfilmentItemStatusId = element.status
                updateData.remarks = element.remarks
                result.updateAttributes(updateData);
            }
        })
    })
    return Promise.resolve(true);
}
