'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
const util = require('util');
const messageConstants = require('../constant/messageConstants');

/**
 * Returns a list of vehicle-profile
 * @param   {req}   
 * @returns {Promise} resolved vehicle-profile if found, otherwise resolves undefined
 */
exports.getAll = function (searchViewModel) {

    var searchModel = searchViewModel.data;
    var sortColumn = searchViewModel.sortColumn;
    let skip = null, limit = null, paginator = null;

    paginator = new Paginator(searchViewModel.currentPage, searchViewModel.pageSize);
    limit = paginator.getLimit();
    skip = paginator.getOffset();

    var filtersVehicle = {};
    filtersVehicle.$and = [{ isDeleted: 0 }];

    var filterVehicleMake = {};
    filterVehicleMake.$and = [{ isDeleted: 0 }];

    var filterVehicleModel = {};
    filterVehicleModel.$and = [{ isDeleted: 0 }];

    var filterVehicleVariant = {};
    filterVehicleVariant.$and = [{ isDeleted: 0 }];

    var filterCustomer = {};
    filterCustomer.$and = [{ isDeleted: 0 }];

    var filterVehicleCustomer = {};
    filterVehicleCustomer.$and = [{ isOwner: 1 }];

    // get other infomation
    let attrVehicleCustomer = ['id', 'registrationNo', 'customerId', 'isOwner'];
    let attrCustomer = ['id', 'name', 'idNumber', 'contact', 'houseTelNo'];
    let attrVehicleSub = ['id', 'code', 'description'];

    if (searchModel) {
        // if ((searchModel.vehicleVariantId != null && searchModel.vehicleVariantId != "") || searchModel.vehicleVariantId == 0) {
        //     filters.$and.push({ vehicleVariantId: { $eq: searchModel.vehicleVariantId } })
        // }

        if (searchModel.engineNo) {
            filtersVehicle.$and.push({ engineNo: { $like: '%' + searchModel.engineNo + '%' } })
        }

        if (searchModel.vinNo) {
            filtersVehicle.$and.push({ VinNo: { $like: '%' + searchModel.vinNo + '%' } })
        }

        if (searchModel.chassisNo) {
            filtersVehicle.$and.push({ chassisNo: { $like: '%' + searchModel.chassisNo + '%' } })
        }

        if ((searchModel.status != null && searchModel.status != "") || searchModel.status == 0) {
            filtersVehicle.$and.push({ status: { $eq: searchModel.status } })
        }

        if (searchModel.vehicleMake) {
            filterVehicleMake.$and.push({ description: { $like: '%' + searchModel.vehicleMake + '%' } });
        }

        if (searchModel.vehicleModel) {
            filterVehicleModel.$and.push({ description: { $like: '%' + searchModel.vehicleModel + '%' } });
        }

        if (searchModel.vehicleVariant) {
            filterVehicleVariant.$and.push({ description: { $like: '%' + searchModel.vehicleVariant + '%' } });
        }

        if (searchModel.registrationNo) {
            filterVehicleCustomer.$and.push({ registrationNo: { $like: '%' + searchModel.registrationNo + '%' } });
        }

        if (searchModel.customerName) {
            filterCustomer.$and.push({ name: { $like: '%' + searchModel.customerName + '%' } });
        }
    }

    // sorting

    let orderby = 'registrationNo';
    if (sortColumn && sortColumn.columnName != null) {
        if (sortColumn.columnName && sortColumn.isAsc) {
            orderby = sortColumn.columnName + ' ASC';
        } else {
            orderby = sortColumn.columnName + ' DESC';
        }
    }

    
    let includeVehicleInfomation = [
        {
            model: db.Vehicle,
            attributes: ['id', 'engineNo', 'vinNo', 'chassisNo', "status", "vehicleVariantId"],
            where: filtersVehicle,
            include: [
                {
                    model: db.VehicleVariant,
                    attributes: ['id', 'code', 'description', 'vehicleModelId'],
                    where: filterVehicleVariant,
                    include: [
                        {
                            model: db.VehicleModel,
                            where: filterVehicleModel,
                            attributes: ['id', 'code', 'description', 'vehicleMakeId'],
                            include: [
                                {
                                    model: db.VehicleMake,
                                    where: filterVehicleMake,
                                    attributes: attrVehicleSub
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            model: db.Customer,
            attributes: attrCustomer,
            where: filterCustomer,
        }
    ];
    return db.VehicleCustomer.findAndCountAll({
        where: filterVehicleCustomer, offset: skip, limit: limit,
        order: orderby,
        attributes: attrVehicleCustomer,
        include: includeVehicleInfomation,
        row: true
    });
}

exports.getVehicleByChassisNo = function (chassisNo) {

    var filter = {};
    filter.$and = [{ isDeleted: 0 }];

    // get other infomation
    // let attrVehicleCustomer = ['id', 'registrationNo', 'customerId', 'isOwner'];
    // let attrCustomer = ['id', 'name', 'idNumber', 'contact', 'houseTelNo'];
    // let attrVehicleSub = ['id', 'code', 'description'];

    if (chassisNo) {
        filter.$and.push({ chassisNo: { $like: '%' + chassisNo + '%' } });
    }

    let includeVehicleInfomation = [
        {
            
            model: db.VehicleVariant,
            //attributes: ['id', 'code', 'description', 'vehicleModelId'],
            include: [
                        {
                            model: db.VehicleModel,
                
                            //attributes: ['id', 'code', 'description', 'vehicleMakeId'],
                            include: [
                                {
                                    model: db.VehicleMake,
                                    
                                    //attributes: attrVehicleSub
                                }
                            ]
                        }
                    ]
                
            
        }
    ];
    return db.Vehicle.find({
        where: filter,
        //attributes: attrVehicleCustomer,
        include: includeVehicleInfomation,
        //row: true
    });
}

/**
 * Get vehicle by id
 */
exports.getById = function (id) {
    return db.Vehicle.find({ where: { id: id } });
}

/**
 * Get vehicle by vinNo
 */
exports.getByVinNo = function (vinNo, variantId) {
    return db.Vehicle.find({ 
        where: { vinNo: vinNo, vehicleVariantId: variantId },
        attributes: ['id'] 
    });
}

/**
 * validate for vehicle
 */
exports.validate = function (vehicle, isUpdate) {
    if (vehicle) {
        if (vehicle.vehicleVariantId == null || vehicle.vehicleVariantId == "") {
            return Promise.resolve({ success: false, message: messageConstants.VEHICLE_VARIANT_REQUIRED });
        } else if (vehicle.vinNo == null || vehicle.vinNo == "") {
            return Promise.resolve({ success: false, message: messageConstants.VEHICLE_VINNO_REQUIRED });
        }
        return Promise.resolve({ success: true });
    }
    return Promise.resolve({ success: false, message: messageConstants.COMMON_PARAM_REQUIRED });
}

/**
 * Create vehicle
 */
exports.create = function (obj) {
    obj.isDeleted = 0;
    obj.createdDateTime = Date();
    obj.updatedDateTime = Date();
    obj.status = 1;

    return this.validate(obj, false).then(resultValidate => {
        if (resultValidate && !resultValidate.success) {
            return Promise.resolve(resultValidate);
        }
        return db.Vehicle.build(obj).save().then(resultVehicle => {
            if (resultVehicle) {
                return { success: true, data: resultVehicle.id, message: util.format(messageConstants.COMMON_CREATE_SUCCESS, 'vehicle') };
            }
            return { success: false, message: util.format(messageConstants.COMMON_CREATE_FAIL, 'vehicle') };
        }).catch(err => {
            return Promise.resolve({ success: false, message: err });
        });
    });
}

/**
 * Update vehicle
 */
exports.update = function (obj) {
    return objVehicle = this.getById(obj.id).then(resultVehicle => {
        if (resultVehicle) {
            return this.validate(obj, true).then(result => {
                if (result && !result.success) {
                    return Promise.resolve(result);
                }
                obj.updatedDateTime = Date();
                return resultVehicle.updateAttributes(obj).then(resultUpdate => {
                    if (resultUpdate) {
                        return Promise.resolve({ success: true, message: util.format(messageConstants.COMMON_UPDATE_SUCCESS, 'vehicle') });
                    }
                    return Promise.resolve({ success: false, message: util.format(messageConstants.COMMON_UPDATE_FAIL, 'vehicle') });
                });
            });
        }
    });
}

/**
 * Delete vehicle
 */
exports.delete = function (obj) {
    var objCustomer = this.findById(id);
    objCustomer.then(result => {
        if (result) {
            return result.updateAttributes({ isDeleted: 1, updatedDateTime: Date() });
        }
    })
    return objCustomer;
}

/**
 * Delete vehicles
 */
exports.deletes = function (obj) {
    if (obj.split(",").length > 1) {
        obj.split(",").forEach(function (prop) {
            this.delete(prop)
        });

        return true;
    }

    return false;
}

/**
 * Get Vehicle by no
 */
exports.getByNo = function (registrationNo, vinNo) {

    let attrVehicle = ['id', 'engineNo', 'vinNo', 'chassisNo'];
    let attrCustomer = ['id', 'name', 'idNumber', 'contact', 'houseTelNo'];
    let attrVehicleSub = ['id', 'code', 'description'];

    let includeVehicle = [{ model: db.Customer, attributes: attrCustomer },
    {
        model: db.Vehicle, attributes: attrVehicle,
        include: [
            {
                model: db.VehicleVariant, attributes: attrVehicleSub, include: [
                    {
                        model: db.VehicleModel, attributes: attrVehicleSub, include: [
                            { model: db.VehicleMake, attributes: attrVehicleSub }
                        ]
                    }
                ]
            }
        ]
    },
    ];

    if (!vinNo) {
        return db.VehicleCustomer.find({
            where: {
                registrationNo: registrationNo,
                isOwner: 1
            },
            // include: [{ model: db.Vehicle }, { model: db.Customer }]
            include: includeVehicle
        });
    }

    if (registrationNo) {
        var vehiclePromise = db.Vehicle.find({ where: { vinNo: vinNo }, attributes: attrVehicle })
            .then(vehicle => {
                if (vehicle) {
                    var vehicleCustomerPromise = db.VehicleCustomer.find({
                        where: {
                            vehicleId: vehicle.id,
                            isOwner: 1,
                            registrationNo: registrationNo,
                        },
                        attributes: ['registrationNo'],
                        // include: [{ model: db.Customer }, { model: db.Vehicle }]
                        include: includeVehicle
                    })
                        .then(vehicleCustomer => {
                            if (vehicleCustomer)
                                vehicleCustomer.Vehicle = vehicle;

                            return vehicleCustomer;
                        })
                    return vehicleCustomerPromise;
                }
                return null;
            })
        return vehiclePromise;
    }
}

exports.getByVehicleCustomerId = function (vehicleCustomerId) {

    return db.VehicleCustomer.find({
        where: {
            id: vehicleCustomerId,
            isOwner: 1
        },
        include: [{ model: db.Customer }, { model: db.Vehicle }]
    });
}

exports.isExistChassisNo = function (chassisNo) {
    return db.Vehicle.count({
        where: {
            chassisNo: chassisNo
        }
    });
}
