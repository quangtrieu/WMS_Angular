'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
const messageConstants = require('../constant/messageConstants');

exports.getAll = function (searchViewModel) {

    let skip = null, limit = null, paginator = null;

    paginator = new Paginator(searchViewModel.currentPage, searchViewModel.pageSize);
    limit = paginator.getLimit();
    skip = paginator.getOffset();

    var filters = { $and: { isDeleted: 0 } };
    var filterVehicleModelCode = { $and: [] };
    var filterVehicleMakeCode = { $and: [] };
    var model = searchViewModel.data;

    if (model != null) {
        if (model.code != null) {
            filters.$or = [{ code: { $like: '%' + model.code + '%' } }]
        }

        if (model.description != null) {
            filters.$or = [{ description: { $like: '%' + model.description + '%' } }]
        }

        if (model.vehicleModelCode != null) {
            filterVehicleModelCode.$and.push([{ code: { $like: '%' + model.vehicleModelCode + '%' } }])
        }

        if (model.vehicleMakeCode != null) {
            filterVehicleMakeCode.$and.push([{ code: { $like: '%' + model.vehicleMakeCode + '%' } }])
        }

        if (model.createdBy != null) {
            filters.$or = [{ createdBy: { $like: '%' + model.createdBy + '%' } }]
        }

        if (model.vehicleModelCode != null) {
            filterVehicleModelCode.$and.push([{ code: { $like: '%' + model.vehicleModelCode + '%' } }])
        }

        if (model.vehicleMakeCode != null) {
            filterVehicleMakeCode.$and.push([{ code: { $like: '%' + model.vehicleMakeCode + '%' } }])
        }

        if (model.status != null) {
            filters.$or = [{ status: { $eq: model.status } }]
        }

        if (model.modifiedBy != null) {
            filters.$or = [{ modifiedBy: { $like: '%' + model.modifiedBy + '%' } }]
        }
    }

    let orderby = 'id ASC';
    return db.VehicleVariant.findAndCountAll({
        where: filters,
        order: orderby,
        offset: skip,
        limit: limit,
        row: false,
        include: [{ model: db.VehicleModel, where: filterVehicleModelCode, include: [{ model: db.VehicleMake, where: filterVehicleMakeCode }] }]
    });
}


// exports.create = function (vehicleVariant) {
//     vehicleVariant.isDeleted = 0;
//     vehicleVariant.createdDateTime = Date();
//     vehicleVariant.updatedDateTime = Date();
//     vehicleVariant.status = 1;

//     return db.VehicleVariant
//         .build(vehicleVariant).save();
// }

exports.checkExist = function (code) {
    return db.VehicleVariant.find({
        where: {
            code: code
        }
    });
}

exports.create = function(vehicleVariant){
    vehicleVariant.isDeleted = 0;
    vehicleVariant.createdDateTime = Date();
    vehicleVariant.updatedDateTime = Date();
    vehicleVariant.status = 1;
    vehicleVariant.vehicleModelId = (vehicleVariant && vehicleVariant.vehicleModel) ? vehicleVariant.vehicleModel.id: 0;

    return this.validate(vehicleVariant, false).then(result => {
        if (result && !result.success) {
            return Promise.resolve(result);
        }
        return this.isExistCode(vehicleVariant.code).then(result => {
            if (result != 0) {
                return Promise.resolve({
                    success: false,
                    message: messageConstants.VEHICLE_VARIANT_EXIST_CODE
                });
            } else {
                return db.VehicleVariant.build(vehicleVariant).save().then(result => {
                    if (result) {
                        return {
                            success: true,
                            message: messageConstants.VEHICLE_VARIANT_CREATE_SUCCESS
                        };
                    }
                    return {
                        success: false,
                        message: messageConstants.VEHICLE_VARIANT_CREATE_FAIL
                    };
                })
            }
        });
    });
}


exports.validate = function (vehicleVariant, isUpdate) {
    if (vehicleVariant) {
        if(vehicleVariant.vehicleMake.id == null || vehicleVariant.vehicleMake.id == 0){
            return Promise.resolve({ success: false, message: messageConstants.VEHICLE_VARIANT_VEHICLEMAKE_CODE_REQUIRED });
        }else{
            if(vehicleVariant.vehicleModel.id == null || vehicleVariant.vehicleModel.id == 0){
                return Promise.resolve({ success: false, message: messageConstants.VEHICLE_VARIANT_VEHICLEMODEL_CODE_REQUIRED });
            }else{
                if ((vehicleVariant.code == null || vehicleVariant.code == "") && !isUpdate) {
                        return Promise.resolve({ success: false, message: messageConstants.VEHICLE_VARIANT_CODE_REQUIRED });
                    } else if (vehicleVariant.code.length > 25 && !isUpdate) {
                        return Promise.resolve({ success: false, message: messageConstants.VEHICLE_VARIANT_CODE_MAXLENGTH });
                    } else if (vehicleVariant.description == null || vehicleVariant.description == "") {
                        return Promise.resolve({
                            success: false,
                            message: messageConstants.VEHICLE_VARIANT_DESCRIPTION_REQUIRED
                        });
                    } else if (vehicleVariant.description.length > 250) {
                        return Promise.resolve({ success: false, message: messageConstants.VEHICLE_VARIANT_DES_MAXLENGTH });
                    }
                    return Promise.resolve({
                        success: true
                    });
            }
            
        }
        
    }
    return Promise.resolve({
        success: false,
        message: messageConstants.VEHICLE_VARIANT_PARAM_REQUIRED
    });
}

exports.update = function (vehicleVariant) {
    vehicleVariant.vehicleModelId = (vehicleVariant && vehicleVariant.vehicleModel) ? vehicleVariant.vehicleModel.id: 0;
    return this.getById(vehicleVariant.id).then(makeResult => {
        if (makeResult) {
            return this.validate(vehicleVariant, true).then(result => {
                if (result && !result.success) {
                    return Promise.resolve(result);
                }
                vehicleVariant.updatedDateTime = Date();
                return makeResult.updateAttributes(vehicleVariant).then(result => {
                    if (result) {
                        return Promise.resolve({
                            success: true,
                            message: messageConstants.VEHICLE_VARIANT_UPDATE_SUCCESS
                        });
                    }
                    return Promise.resolve({
                        success: false,
                        message: messageConstants.VEHICLE_VARIANT_UPDATE_FAIL
                    });
                });
            });
        }
        return Promise.resolve({
            success: false,
            message: messageConstants.VEHICLE_VARIANT_NOTFOUND
        });
    })
}

// exports.update = function (vehicleVariant) {
//     var task = this.getById(vehicleVariant.id);
//     task.then(result => {
//         if (result) {
//             vehicleVariant.updatedDateTime = Date();
//             return result.updateAttributes(vehicleVariant);
//         }
//     })
//     return task;
// }

exports.getById = function (id) {
    return db.VehicleVariant.find({
        where: { id: id },
        include: [
            {
                model: db.VehicleModel,
                include: [{
                    model: db.VehicleMake
                }]
            }
        ]
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

exports.getByVehicleId = function (vehicleId) {
    var task = db.VehicleCustomer.find({
        where: {
            vehicleId: vehicleId
        }
    }).then(vehicleCustomer => {
        if (vehicleCustomer) {
            return db.VehicleVariant.find({
                where: {
                    id: vehicleCustomer.vehicleId
                },
                include: [
                    { model: db.VehicleModel, include: [{ model: db.VehicleMake }] }
                ]
            });
        }
        return null;
    })

    return task;
}

exports.getByVehicleModelId = function (vehicleModelId) {
    var filters = {};
    filters.$and = [{ isDeleted: 0 }];
    filters.$and.push({ $and: { vehicleModelId: vehicleModelId } });
    return db.VehicleVariant.findAndCountAll({ where: filters, row: true });
}

exports.isExistCode = function (code) {
    return db.VehicleVariant.count({
        where: {
            code: code
        }
    });
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
        if (searchModel.vehicleModel) {
            var modelId = parseInt(searchModel.vehicleModel.id);
            filters.$and.push({
                vehicleModelId: {
                    $eq: modelId
                }
            })
        }
    }

    let orderby = 'id';
    return db.VehicleVariant.findAndCountAll({
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
