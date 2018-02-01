'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
const util = require('util');
const messageConstants = require('../constant/messageConstants');

/**
 * Returns a list of vehicleMake
 * @param   {SearchViewModel}   searchViewModel - The model search to find
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.getPaging = function (searchViewModel) {
    let skip = null, limit = null, paginator = null;

    paginator = new Paginator(searchViewModel.currentPage, searchViewModel.pageSize);
    limit = paginator.getLimit();
    skip = paginator.getOffset();

    var filters = { $and: { isDeleted: 0 } };
    var model = searchViewModel.data;

    if (model != null) {
        if (model.partId != null) {
            filters.$or = [{ partId: { $like: '%' + model.partId + '%' } }]
        }

        if (model.modelId != null) {
            filters.$or = [{ status: { $eq: model.modelId } }]
        }

        if (model.vinNo != null) {
            filters.$or = [{ status: { $eq: model.vinNo } }]
        }

        if (model.engineNo != null) {
            filters.$or = [{ status: { $eq: model.engineNo } }]
        }

        if (model.chassisNo != null) {
            filters.$or = [{ status: { $eq: model.chassisNo } }]
        }

        if (model.createdBy != null) {
            filters.$or = [{ createdBy: { $eq: model.createdBy } }]
        }
    }

    let orderby = 'id DESC';
    return db.VehicleCustomer.findAndCountAll({ where: filters, order: orderby, offset: skip, limit: limit, row: true });
}

/**
 * Get by vehicle
 */
exports.getByVehicle = function (id) {

    // get other infomation
    let attrVehicleCustomer = ['id', 'registrationNo', 'customerId'];
    let attrCustomer = ['id', 'name', 'idNumber', 'contact', 'houseTelNo', 'address', 'addressCountry', 'addressState', 
        'addressCity', 'addressPostalCode', 'email'];
    let attrVehicleSub = ['id', 'code', 'description'];

    let includeVehicleInfomation = [
        {
            model: db.Vehicle,
            attributes: ['id', 'engineNo', 'vinNo', 'chassisNo', 'status', 'vehicleVariantId', 'registrationDate', 'purchaseDate', 'niscareOrRenCare', 'npmp', 'status'],
            include: [
                {
                    model: db.VehicleVariant,
                    attributes: ['id', 'code', 'description', 'vehicleModelId'],
                    where: { isDeleted: 0 },
                    include: [
                        {
                            model: db.VehicleModel,
                            where: { isDeleted: 0 },
                            attributes: ['id', 'code', 'description', 'vehicleMakeId'],
                            include: [
                                {
                                    model: db.VehicleMake,
                                    where: { isDeleted: 0 },
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
            where: { isDeleted: 0 },

        }
    ];

    return db.VehicleCustomer.find({ where: { id: id }, include: includeVehicleInfomation, attributes: attrVehicleCustomer });
}

/**
 * Get by registrationNo
 */
exports.getByRegistrationNo = function (registrationNo) {
    return db.VehicleCustomer.find({ 
        where: { registrationNo: registrationNo, isOwner: 1 }, 
        });
}

/**
 * validate for vehicleCustomer
 */
exports.validate = function (vehicleCustomer, isUpdate) {
    if (vehicleCustomer) {
        if (vehicleCustomer.registrationNo == null || vehicleCustomer.registrationNo == "") {
            return Promise.resolve({ success: false, message: messageConstants.VEHICLE_CUSTOMER_REGISTRATION_NO_REQUIRED });
        } else if (vehicleCustomer.vehicleId == null || vehicleCustomer.vehicleId == "") {
            return Promise.resolve({ success: false, message: messageConstants.VEHICLE_CUSTOMER_VEHICLE_ID_REQUIRED });
        } else if (vehicleCustomer.customerId == null || vehicleCustomer.customerId == "") {
            return Promise.resolve({ success: false, message: messageConstants.VEHICLE_CUSTOMER_CUSTOMER_ID_REQUIRED });
        }
        return Promise.resolve({ success: true });
    }
    return Promise.resolve({ success: false, message: messageConstants.COMMON_PARAM_REQUIRED });
}

/**
 * Create vehicle customer
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
        return db.VehicleCustomer.build(obj).save().then(resultVehicleCustomer => {
            if (resultVehicleCustomer) {
                return { success: true, message: util.format(messageConstants.COMMON_CREATE_SUCCESS, 'vehicleCustomer') };
            }
            return { success: false, message: util.format(messageConstants.COMMON_CREATE_FAIL, 'vehicleCustomer') };
        }).catch(err => {
            return Promise.resolve({ success: false, message: err });
        });
    });
}

/**
 * Update vehicle customer
 */
exports.update = function (obj, res) {
    return objVehicleCustomer = this.findById(obj.id).then(resultVehicleCustomer => {
        if (resultVehicleCustomer) {
            return this.validate(obj, true).then(result => {
                if (result && !result.success) {
                    return Promise.resolve(result);
                }
                obj.updatedDateTime = Date();
                return resultVehicleCustomer.updateAttributes(obj).then(resultUpdate => {
                    if (resultUpdate) {
                        return Promise.resolve({ success: true, message: util.format(messageConstants.COMMON_UPDATE_SUCCESS, 'vehicleCustomer') });
                    }
                    return Promise.resolve({ success: false, message: util.format(messageConstants.COMMON_UPDATE_FAIL, 'vehicleCustomer') });
                });
            });
        }
    });
}

/**
 * Delete part
 */
exports.delete = function (obj, res) {
    db.VehicleCustomer.find({
        where: {
            id: obj
        }
    }).then(function (part) {
        if (part) {
            part.updateAttributes({ isDeleted: 1 }).then(function (obj) {
                let response = { success: 1, message: "Deleted" };
                res.json(response);
            }).catch(function (e) {
                let message = 'Delete part errors!';
                if (e.errors) {
                    message = [];
                    e.errors.forEach(function (item) {
                        message.push(item.message);
                    });
                }
                let response = { success: 0, message: message };
                res.json(response);
            });
        } else {
            let response = { success: "0", message: "not found customer with id: " + obj };
            res.json(response);
        }
    }).catch(function (e) {
        let response = { success: 0, message: "delete errors!" };
        res.json(response);
    });
}

/**
 * Get RegistrationNO by id
 */
exports.findByNo = function (data) {
    var idArray = JSON.parse(data.ids);
    return db.VehicleCustomer.findAll({
        where: { id: { $in: [idArray] }, isOwner: true },
        include: [{ model: db.Customer, attributes: ['name'] }]
    });
}


exports.getVehicleByRegistrationNo = function (registrationNo) {
    return db.VehicleCustomer.find({
        where: { registrationNo: registrationNo, isOwner: true },
        include: [
            {
                model: db.Vehicle,
                include: [{
                    model: db.VehicleVariant, attributes: ['id', 'code', 'vehicleModelId'],
                    include: [{
                        model: db.VehicleModel, attributes: ['id', 'code', 'description'],
                        include: [{
                            model: db.VehicleMake, attributes: ['id', 'code', 'description']
                        }]
                    }]
                }]
            },
            { model: db.Customer, attributes: ['id', 'name'] }
        ]
    })
}

exports.checkExistRegistrationNo = function (registrationNo) {
    return db.VehicleCustomer.count({
        where: {
            registrationNo: registrationNo
        }
    });
}
