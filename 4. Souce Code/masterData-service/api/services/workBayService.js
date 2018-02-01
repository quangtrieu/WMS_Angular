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

    return db.Bay.findAndCountAll({
        distinct: 'id',
        where: filters, order: orderby, offset: skip, limit: limit, row: true,
        attributes: ['id', 'code', "description", "status", "pdJobTypeId", "pdHoistId"],
        include: [
            { model: db.BayEmployee, attributes: ['id', 'bayId', 'employeeId'], include: [db.Employee] },
            { model: db.PDJobType, attributes: ['id', 'code', 'description', 'status'] },
            { model: db.PDHoistType, attributes: ['id', 'code', 'description', 'status'] }]
    });
}

/**
 * Get workbay by id
 */
exports.findById = function (id) {
    return db.Bay.find({
        where: { id: id }, attributes: ['id', 'code', "description", "status", "pdJobTypeId", "pdHoistId"],
        include: [
            { model: db.BayEmployee, attributes: ['id', 'bayId', 'employeeId'], include: [db.Employee] },
            { model: db.PDJobType, attributes: ['id', 'code', 'description', 'status'] },
            { model: db.PDHoistType, attributes: ['id', 'code', 'description', 'status'] }]
    });
}

/**
 * Get list hoist
 */
exports.findHoist = function () {
    return db.PDHoistType.findAll({
        attributes: ['id', 'code', "description", "status"],
    });
}

/**
 * Get list bay type
 */
exports.findBayType = function () {
    return db.PDJobType.findAll({
        attributes: ['id', 'code', "description", "status"],
    });
}

/**
 * Get list employee
 */
exports.findEmployee = function () {
    return db.Employee.findAll({
        attributes: ['id', 'code', "name", "status"],
    });
}

/**
 * Create workbay bay and bayEmp
 */
exports.create = function (obj) {
    var empId;
    var objBay = {}
    objBay.isDeleted = 0;
    objBay.createdDateTime = Date();
    objBay.updatedDateTime = Date();
    objBay.status = obj.status;
    objBay.pdHoistId = obj.PDHoistType.id;
    objBay.pdJobTypeId = obj.PDJobType.id
    objBay.description = obj.description;
    objBay.code = obj.code;
    db.Bay.build(objBay).save().then(result => {
        empId = result.dataValues.id

        obj.employee.forEach(element => {
            var objBayEmployee = {}
            objBayEmployee.isDeleted = 0;
            objBayEmployee.createdDateTime = Date();
            objBayEmployee.updatedDateTime = Date();
            objBayEmployee.employeeId = element;
            objBayEmployee.bayId = empId;
            db.BayEmployee.build(objBayEmployee).save();
        })
    });


    return Promise.resolve(true);
}

// Update bay and bayEmp
exports.update = function (objWorkBay) {

    var objBay = db.Bay.find({
        where: {
            id: objWorkBay.id
        }
    })
    var obj = {}
    objBay.then(result => {
        if (result) {
            obj.updatedDateTime = Date();
            obj.pdHoistId = objWorkBay.PDHoistType.id;
            obj.pdJobTypeId = objWorkBay.PDJobType.id;
            obj.status = objWorkBay.status;
            obj.description = objWorkBay.description;
            obj.code = objWorkBay.code;
            result.updateAttributes(obj);
        }
    })

    var objBayEmp = db.BayEmployee.findAll({
        where: {
            bayId: objWorkBay.id
        }
    })
    objBayEmp.then(result => {
        if (result) {
            result.forEach(element1 => {
                element1.destroy();
            })

        }
    })

    objWorkBay.employee.forEach(element => {
        var objBayEmployee = {}
        objBayEmployee.updatedDateTime = new Date();
        objBayEmployee.employeeId = element;
        objBayEmployee.bayId = objWorkBay.id
        objBayEmployee.isDeleted = 0;
        db.BayEmployee.build(objBayEmployee).save();
    })
    return Promise.resolve(true);
}