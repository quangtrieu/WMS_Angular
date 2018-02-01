'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
const messageConstants = require('../constant/messageConstants');
const util = require('util');

/**
 * Returns a list of vehicleMake
 * @param   {SearchViewModel}   searchViewModel - The model search to find
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.getAll = function (searchViewModel) {
    let skip = null, limit = null, paginator = null;

    paginator = new Paginator(searchViewModel.currentPage, searchViewModel.pageSize);
    limit = paginator.getLimit();
    skip = paginator.getOffset();

    var filters = {};
    filters.$and = [{ isDeleted: 0 }];
    var searchModel = searchViewModel.data;
    var sortColumn = searchViewModel.sortColumn;

    // if (searchModel != null) {
    //     if (searchModel.code) {
    //         filters.$and.push({ code: { $like: searchModel.code + '%' } })
    //     }

    //     if (searchModel.description) {
    //         filters.$and.push({ description: { $like: '%' + searchModel.description + '%' } })
    //     }

    //     if (searchModel.createdBy) {
    //         filters.$and.push({ createdBy: { $eq: searchModel.createdBy } })
    //     }

    //     if (searchModel.status == 0 || searchModel.status == 1) {
    //         filters.$and.push({ status: { $eq: searchModel.status } })
    //     }

    //     if (searchModel.modifiedBy) {
    //         filters.$and.push({ modifiedBy: { $eq: searchModel.modifiedBy } })
    //     }
    // }

    let orderby = 'id DESC';
    if (sortColumn && sortColumn.columnName != null) {
        if (sortColumn.columnName && sortColumn.isAsc) {
            orderby = sortColumn.columnName + ' ASC';
        } else {
            orderby = sortColumn.columnName + ' DESC';
        }
    }

    return db.JobPartMaster.findAndCountAll({
        where: filters, order: orderby, offset: skip, limit: limit, row: true,
        include: [
            { model: db.VehicleVariant, include: [{ model: db.VehicleModel, include: [db.VehicleMake] }] },
            { model: db.JobPartItem, include: [db.PartMaster] },
            { model: db.JobMaster },
        ]
    });
}

exports.getById = function (jobPartId, partId) {
    return db.JobPartItem.find({
        where: {
            jobPartId: jobPartId,
            partId: partId
        },
        include: [
            {
                model: db.JobPartMaster,
                include: [{ model: db.VehicleVariant, include: [{ model: db.VehicleModel, include: [db.VehicleMake] }] }, { model: db.JobMaster },]
            },
            { model: db.PartMaster },
        ]
    });
}

//get all part by jobId
exports.getByJobId = function (jobPartId) {
    return db.JobPartItem.findAll({
        where: {
            jobPartId: jobPartId,
        },
        include: [
            {
                model: db.JobPartMaster,
                include: [{ model: db.VehicleVariant, include: [{ model: db.VehicleModel, include: [db.VehicleMake] }] }, { model: db.JobMaster },]
            },
            { model: db.PartMaster },
        ]
    });
}

// vehicle VehicleMake
exports.getVehicleMake = function () {
    return db.VehicleMake.findAll({
    });
}

// vehicle VehicleModel
exports.getVehicleModel = function (id) {
    return db.VehicleModel.findAll({
        where: {
            vehicleMakeId: id,
        }
    });
}

// vehicle VehicleVariant
exports.getVehicleVariant = function (id) {
    return db.VehicleVariant.findAll({
        where: {
            vehicleModelId: id,
        }
    });
}

// vehicle all VehicleModel
exports.getAllVehicleModel = function (id) {
    return db.VehicleModel.findAll({
    });
}

// vehicle all VehicleVariant
exports.getAllVehicleVariant = function (id) {
    return db.VehicleVariant.findAll({
    });
}

// Job Master
exports.getJobMaster = function () {
    return db.JobMaster.findAll({
    });
}

// Part Master
exports.getPartMaster = function () {
    return db.PartMaster.findAll({
    });
}

//get lastest JobPartMasterId
exports.getLastestJobPartMasterId = function () {
    return db.JobPartMaster.find({
        order: [
            ['id', 'DESC']
        ]
    });
}

exports.getByJobIdAndVariantId = (jobId, vehicleVariantId) => {
    return db.JobPartMaster.find({
        where: {
            vehicleVariantId: vehicleVariantId,
            jobId: jobId
        },
        include: [
            { model: db.JobMaster },
            { model: db.JobPartItem }
        ]
    });
}

//update
exports.update = (obj) => {
    obj.forEach(element => {
        var data = db.JobPartItem.find({
            where: {
                jobPartId: element.jobPartId,
                partId: element.partId
            }
        });
        data.then(result => {
            if (result) {
                var subData = {}
                subData.quantity = element.qty
            return result.updateAttributes(subData);
            }
        })
    })
    return Promise.resolve(true);
}


exports.create = (obj) => {
    var objChange = {}
    var jobPartObj = db.JobPartMaster.find({
        where: {
            vehicleVariantId: obj.vehicleVariant,
            jobId: obj.jobId
        }
    });

    jobPartObj.then(result => {
        if (result != null) {
            //update
            var jobPartItemObj = db.JobPartItem.find({
                where: {
                    jobPartId: result.dataValues.id,
                    partId: obj.partId,
                }
            })
            jobPartItemObj.then(result1 => {
                if (result1 != null) {
                    //update jobPartItem
                    objChange.quantity = obj.qty;
                    return result1.updateAttributes(objChange);
                } else {
                    //create new jobPartItem
                    objChange.jobPartId = result.dataValues.id
                    objChange.partId = obj.partId
                    objChange.quantity = obj.qty;
                    objChange.createDateTime = Date();
                    return db.JobPartItem.build(objChange).save();
                }
            })
        } else {
            //create new all
            objChange.vehicleVariantId = obj.vehicleVariant
            objChange.jobId = obj.jobId
            objChange.createDateTime = new Date()
            objChange.isDeleted = 0
            db.JobPartMaster.build(objChange).save().then(result => {
                objChange.jobPartId = result.id
                objChange.partId = obj.partId
                objChange.quantity = obj.qty
                objChange.createDateTime = Date()
                db.JobPartItem.build(objChange).save();
            });
        }

    })
    return Promise.resolve(true);
}