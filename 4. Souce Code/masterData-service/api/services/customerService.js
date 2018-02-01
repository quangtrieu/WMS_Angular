'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
const messageConstants = require('../constant/messageConstants');
const dbUtil = require('../../../tceas-utils/utils/utils');
const documentModule = require('../../../tceas-utils/constant/enums/documentModule');
const util = require('util');

/**
 * Returns a list of customer
 * @param   {req}   
 * @returns {Promise} resolved customers if found, otherwise resolves undefined
 */
exports.getAll = function (searchViewModel) {
    let skip = null, limit = null, paginator = null;
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
            filters.$and.push({ code: { $like: '%' + searchModel.code + '%' } })
        }

        if (searchModel.name) {
            filters.$and.push({ name: { $like: '%' + searchModel.name + '%' } })
        }

        if (searchModel.idNumber) {
            filters.$and.push({ idNumber: { $like: '%' + searchModel.idNumber + '%' } })
        }

        if (searchModel.contact) {
            filters.$and.push({ contact: { $like: '%' + searchModel.contact + '%' } })
        }

        if ((searchModel.status != null && searchModel.status != "") || searchModel.status == 0) {
            filters.$and.push({ status: { $eq: searchModel.status } })
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

    return db.Customer.findAndCountAll({
        where: filters,
        order: orderby,
        offset: skip,
        limit: limit,
        row: true
    });
}


/**
 * Get customer by id
 */
exports.getById = function (id) {
    return db.Customer.find({ where: { id: id } });
}

/**
 * Check exist customer code
 */
exports.getByCode = function (code) {
    return db.Customer.find({
        where: { code: code },
        attributes: ['id', 'code']
    });
}

/**
 * Create customer
 */
exports.create = function (objCustomer) {
    objCustomer.isDeleted = 0;
    objCustomer.createdDateTime = Date();
    objCustomer.status = 1;

    return this.validate(objCustomer, false).then(result => {
        if (result && !result.success) {
            return Promise.resolve(result);
        }

        // check format from documentNoFormat
        if(result) {
            return dbUtil.getDocumentFormat(db.DocumentNoFormat, "NHT", documentModule.CUSTOMER)
                .then(resultDocumentNo => { 
                    objCustomer.code = resultDocumentNo.code;

                    return db.Customer.build(objCustomer).save().then(result => {
                        if (result) {
                            dbUtil.setDocumentFormat(db.DocumentNoFormat, "NHT", documentModule.CUSTOMER, resultDocumentNo.code, resultDocumentNo.runningNo);
                            return {
                                success: true,
                                message: messageConstants.CUSTOMER_CREATE_SUSSCESS
                            };
                        }
                        return {
                            success: false,
                            message: messageConstants.CUSTOMER_CREATE_FAIL
                        };
                    });
                });
        }
    });
}

exports.validate = function (customer, isUpdate) {
    if (customer) {
        if (customer.name == null || customer.name == "") {
            return Promise.resolve({ success: false, message: messageConstants.CUSTOMER_NAME_REQUIRED });
        } else if (customer.name.length > 50) {
            return Promise.resolve({ success: false, message: messageConstants.CUSTOMER_NAME_MAXLENGTH });
        } else if (customer.customerType == null ) {
            return Promise.resolve({
                success: false,
                message: messageConstants.CUSTOMER_TYPE_REQUIRED
            });
        } else if (customer.pdIdTypeId == null) {
            return Promise.resolve({ success: false, message: messageConstants.CUSTOMER_ID_TYPE_REQUIRED });
        } else if (customer.idNumber == null || customer.idNumber == 0) {
            return Promise.resolve({ success: false, message: messageConstants.CUSTOMER_IDNUMBER_REQUIRED });
        }
        return Promise.resolve({
            success: true
        });
    }
    return Promise.resolve({
        success: false,
        message: messageConstants.CUSTOMER_PARAM_REQUIRED
    });
 }

exports.findById = function (id) {
    return db.Customer.find({
        where: {
            id: id
        }
    });
}

/**
 * Update customer
 */

exports.update = function (customerObj) {
    return this.findById(customerObj.id).then(makeResult => {
        if (makeResult) {
            return this.validate(customerObj, true).then(result => {
                if (result && !result.success) {
                    return Promise.resolve(result);
                }
                customerObj.updatedDateTime = Date();
                return makeResult.updateAttributes(customerObj).then(result => {
                    if (result) {
                        return Promise.resolve({
                            success: true,
                            message: messageConstants.CUSTOMER_UPDATE_SUSSCESS
                        });
                    }
                    return Promise.resolve({
                        success: false,
                        message: messageConstants.CUSTOMER_UPDATE_FAIL
                    });
                });
            });
        }
        return Promise.resolve({
            success: false,
            message: messageConstants.CUSTOMER_NOT_FOUND
        });
    })
}


/**
 * Delete customer
 */
exports.delete = function (obj) {
    var objCustomer = this.findById(obj);
    objCustomer.then(result => {
        if (result) {
            return result.updateAttributes({ isDeleted: 1, updatedDateTime: Date() });
        }
    })
    return objCustomer;
}

/**
 * Delete customers
 */
exports.deletes = function (obj) {
    if (obj.split(",").length > 1) {
        obj.split(",").forEach(prop => {
            var objCustomer = this.findById(prop);
            objCustomer.then(result => {
                if (result) {
                    result.updateAttributes({ isDeleted: 1, updatedDateTime: Date() });
                }
            })
        });

        return Promise.resolve(true);
    }

    return Promise.resolve(false);
}
