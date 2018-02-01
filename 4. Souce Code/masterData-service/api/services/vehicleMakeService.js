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
    var sortColumn = searchViewModel.sortColumn;

    if (searchModel != null) {
        if (searchModel.code) {
            filters.$and.push({ code: { $like: searchModel.code + '%' } });
        }

        if (searchModel.description) {
            filters.$and.push({ description: { $like: '%' + searchModel.description + '%' } });
        }

        if (searchModel.createdBy) {
            filters.$and.push({ createdBy: { $like: '%' + searchModel.createdBy + '%' } });
        }

        if (searchModel.status == 0 || searchModel.status == 1) {
            filters.$and.push({ status: { $eq: searchModel.status } });
        }

        if (searchModel.updatedBy) {
            filters.$and.push({ updatedBy: { $like: '%' + searchModel.updatedBy + '%' } });
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

    return db.VehicleMake.findAndCountAll({
        where: filters,
        order: orderby,
        offset: skip,
        limit: limit,
        row: true
    });
}

/**
 * Check exists vehicleMake code
 */
exports.isExistCode = function (code) {
    return db.VehicleMake.count({
        where: {
            code: code
        }
    });
}

/**
 * Get VehicleMake by id
 */
exports.findById = function (id) {
    return db.VehicleMake.find({
        where: {
            id: id
        }
    });
}

/**
 * create vehicle Make
 */
exports.create = function (vehicleMake) {
    vehicleMake.isDeleted = 0;
    vehicleMake.createdDateTime = Date();
    vehicleMake.updatedDateTime = Date();
    vehicleMake.status = 1;
    vehicleMake.createdBy = "Test";
    vehicleMake.updatedBy = "Test";

    return this.validate(vehicleMake, false).then(result => {
        if (result && !result.success) {
            return Promise.resolve(result);
        }
        return this.isExistCode(vehicleMake.code).then(result => {
            if (result != 0) {
                return Promise.resolve({
                    success: false,
                    message: messageConstants.VEHICLE_MAKE_EXIST_CODE
                });
            } else {
                return db.VehicleMake.build(vehicleMake).save().then(result => {
                    if (result) {
                        return {
                            success: true,
                            message: messageConstants.VEHICLE_MAKE_CREATE_SUCCESS
                        };
                    }
                    return {
                        success: false,
                        message: messageConstants.VEHICLE_MAKE_CREATE_FAIL
                    };
                })
            }
        });
    });
}

/**
 * validate form for vehicleMake
 */
exports.validate = function (vehicleMake, isUpdate) {
    if (vehicleMake) {
        if ((vehicleMake.code == null || vehicleMake.code == "") && !isUpdate) {
            return Promise.resolve({ success: false, message: messageConstants.VEHICLE_MAKE_CODE_REQUIRED });
        } else if (vehicleMake.code.length < 1 &&vehicleMake.code.length > 25 && !isUpdate) {
            return Promise.resolve({ success: false, message: messageConstants.VEHICLE_MAKE_CODE_MAXLENGTH });
        } else if (vehicleMake.description == null || vehicleMake.description == "") {
            return Promise.resolve({
                success: false,
                message: messageConstants.VEHICLE_MAKE_DESCRIPTION_REQUIRED
            });
        } else if (vehicleMake.description.length > 250 && vehicleMake.description.length < 1) {
            return Promise.resolve({ success: false, message: messageConstants.VEHICLE_MAKE_DES_MAXLENGTH });
        }
        return Promise.resolve({
            success: true
        });
    }
    return Promise.resolve({
        success: false,
        message: messageConstants.VEHICLE_MAKE_PARAM_REQUIRED
    });
}

/**
 * Update vehicle profile
 */
exports.update = function (vehicleMake) {
    return this.findById(vehicleMake.id).then(makeResult => {
        if (makeResult) {
            return this.validate(vehicleMake, true).then(result => {
                if (result && !result.success) {
                    return Promise.resolve(result);
                }
                vehicleMake.updatedDateTime = Date();
                return makeResult.updateAttributes(vehicleMake).then(result => {
                    if (result) {
                        return Promise.resolve({
                            success: true,
                            message: messageConstants.VEHICLE_MAKE_UPDATE_SUCCESS
                        });
                    }
                    return Promise.resolve({
                        success: false,
                        message: messageConstants.VEHICLE_MAKE_UPDATE_FAIL
                    });
                });
            });
        }
        return Promise.resolve({
            success: false,
            message: messageConstants.VEHICLE_MAKE_NOTFOUND
        });
    })
}

/*
 Filter Vehicle Make By Code Or Description
*/
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
                like: searchModel.query + '%'
            }));
        }
    }

    let orderby = 'id';
    return db.VehicleMake.findAndCountAll({
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