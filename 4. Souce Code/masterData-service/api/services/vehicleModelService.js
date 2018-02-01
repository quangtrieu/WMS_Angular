'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
const messageConstants = require('../constant/messageConstants');
const util = require('util');

exports.getAll = function (searchViewModel) {

    let skip = null, limit = null, paginator = null;

    paginator = new Paginator(searchViewModel.currentPage, searchViewModel.pageSize);
    limit = paginator.getLimit();
    skip = paginator.getOffset();

    var filters = { $and: { isDeleted: 0 } };
    var filterVehiclemake = { $and: [] };

    var model = searchViewModel.data;
    var sortColumn = searchViewModel.sortColumn;

    if (model != null) {
        if (model.code != null) {
            filters.$or = [{ code: { $like: '%' + model.code + '%' } }]
        }

        if (model.description != null) {
            filters.$or = [{ description: { $like: '%' + model.description + '%' } }]
        }

        if (model.vehicleMakeCode != null) {
            filterVehiclemake.$and.push([{ code: { $like: '%' + model.vehicleMakeCode + '%' } }])
        }

        if (model.createdBy != null) {
            filters.$or = [{ createdBy: { $eq: model.createdBy } }]
        }

        if (model.status != null) {
            filters.$or = [{ status: { $eq: model.status } }]
        }

        if (model.modifiedBy != null) {
            filters.$or = [{ modifiedBy: { $eq: model.modifiedBy } }]
        }
    }

    let orderby = 'code';
    if (sortColumn && sortColumn.columnName != null) {
        if (sortColumn.columnName && sortColumn.isAsc) {
            orderby = sortColumn.columnName + ' ASC';
        } else {
            orderby = sortColumn.columnName + ' DESC';
        }
    }

    return db.VehicleModel.findAndCountAll({
        where: filters,
        order: orderby,
        offset: skip,
        limit: limit,
        row: true,
        include: [{ model: db.VehicleMake, where: filterVehiclemake }]
    });
}

exports.isExistCode = function (code) {
    return db.VehicleModel.count({
        where: {
            code: code
        }
    });
}

exports.create = function (vehicleModel) {
    vehicleModel.isDeleted = 0;
    vehicleModel.createdDateTime = Date();
    vehicleModel.updatedDateTime = Date();
    vehicleModel.status = 1;
    vehicleModel.vehicleMakeId = (vehicleModel && vehicleModel.VehicleMake) ? vehicleModel.VehicleMake.id : 0;

    return this.validate(vehicleModel, false).then(result => {
        if (result && !result.success) {
            return Promise.resolve(result);
        }
        return this.isExistCode(vehicleModel.code).then(result => {
            if (result != 0) {
                return Promise.resolve({
                    success: false,
                    message: messageConstants.VEHICLE_MODEL_EXIST_CODE
                });
            } else {
                return db.VehicleModel.build(vehicleModel).save().then(result => {
                    if (result) {
                        return {
                            success: true,
                            message: messageConstants.VEHICLE_MODEL_CREATE_SUCCESS
                        };
                    }
                    return {
                        success: false,
                        message: messageConstants.VEHICLE_MODEL_CREATE_FAIL
                    };
                })
            }
        });
    });
}

exports.validate = function (vehicleModel, isUpdate) {
    if (vehicleModel) {
        if (vehicleModel.VehicleMake.id == null || vehicleModel.VehicleMake.id == 0) {
            return Promise.resolve({ success: false, message: messageConstants.VEHICLE_MODEL_VEHICLEMAKE_CODE_REQUIRED });
        } else {
            if ((vehicleModel.code == null || vehicleModel.code == "") && !isUpdate) {
                return Promise.resolve({ success: false, message: messageConstants.VEHICLE_MODEL_CODE_REQUIRED });
            } else if (vehicleModel.code.length > 25 && !isUpdate) {
                return Promise.resolve({ success: false, message: messageConstants.VEHICLE_MODEL_CODE_MAXLENGTH });
            } else if (vehicleModel.description == null || vehicleModel.description == "") {
                return Promise.resolve({
                    success: false,
                    message: messageConstants.VEHICLE_MODEL_DESCRIPTION_REQUIRED
                });
            } else if (vehicleModel.description.length > 250) {
                return Promise.resolve({ success: false, message: messageConstants.VEHICLE_MODEL_DES_MAXLENGTH });
            }
            return Promise.resolve({
                success: true
            });
        }

    }
    return Promise.resolve({
        success: false,
        message: messageConstants.VEHICLE_MODEL_PARAM_REQUIRED
    });
}

exports.checkExist = function (code) {
    return db.VehicleModel.find({
        where: {
            code: code
        }
    });
}

exports.update = function (vehicleModel) {
    vehicleModel.vehicleMakeId = (vehicleModel && vehicleModel.VehicleMake) ? vehicleModel.VehicleMake.id : 0;
    return this.getById(vehicleModel.id).then(makeResult => {
        if (makeResult) {
            return this.validate(vehicleModel, true).then(result => {
                if (result && !result.success) {
                    return Promise.resolve(result);
                }
                vehicleModel.updatedDateTime = Date();
                return makeResult.updateAttributes(vehicleModel).then(result => {
                    if (result) {
                        return Promise.resolve({
                            success: true,
                            message: messageConstants.VEHICLE_MODEL_UPDATE_SUCCESS
                        });
                    }
                    return Promise.resolve({
                        success: false,
                        message: messageConstants.VEHICLE_MODEL_UPDATE_FAIL
                    });
                });
            });
        }
        return Promise.resolve({
            success: false,
            message: messageConstants.VEHICLE_MODEL_NOTFOUND
        });
    })
}

exports.getById = function (id) {
    return db.VehicleModel.find({
        where: { id: id },
        include: [{ model: db.VehicleMake }]
    });
}

exports.delete = function (id) {
    var task = this.getById(id);
    task.then(result => {
        if (result) {
            return result.updateAttributes({ isDeleted: 1, updatedDateTime: Date() });
        }
    })
    return task;
}

exports.getByVehicleMakeId = function (vehicleMakeId) {
    var filters = {};
    filters.$and = [{ isDeleted: 0 }];
    filters.$and.push({ $and: { vehicleMakeId: vehicleMakeId } });
    return db.VehicleModel.findAndCountAll({ where: filters, row: true });
}

exports.filter = function (searchViewModel) {
    let skip = null,
        limit = null,
        paginator = null;

    paginator = new Paginator(searchViewModel.currentPage, searchViewModel.pageSize);
    limit = paginator.getLimit();
    skip = paginator.getOffset();

    var filters = {};
    filters.$and = [{
        isDeleted: 0
    }];
    var searchModel = searchViewModel.data;

    if (searchModel != null) {
        if (searchModel.query) {
            filters.$or = [];
            filters.$or.push({
                code: {
                    $like: searchModel.query + '%'
                }
            })
            filters.$or.push({
                description: {
                    $like: searchModel.query + '%'
                }
            })
            filters.$or.push(db.sequelize.where(db.sequelize.fn("concat", db.sequelize.col("code"), ' - ', db.sequelize.col("description")), {
                $like: searchModel.query + '%'
            }));
        }
        if (searchModel.vehicleMake) {
            var makeId = parseInt(searchModel.vehicleMake.id);
            filters.$and.push({
                vehicleMakeId: {
                    $eq: makeId
                }
            })
        }
    }

    let orderby = 'id';
    return db.VehicleModel.findAndCountAll({
        where: filters,
        attributes: [
            'id', [db.sequelize.fn("concat", db.sequelize.col("code"), ' - ', db.sequelize.col("description")), 'display']
        ],
        order: orderby,
        offset: skip,
        limit: limit,
        row: true
    });
}