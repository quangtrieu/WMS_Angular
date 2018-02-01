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

    return db.Employee.findAndCountAll({
        distinct: 'id',
        where: filters, order: orderby, offset: skip, limit: limit, row: true,
        attributes: ['id', 'code', "name", "status"],
        include: [
            { model: db.EmployeeRole, attributes: ['id', 'employeeId', 'pdEmployeeRoleId', 'checked'], include: [db.PDEmployeeRole] },
        ]
    });
}

/**
 * Get workPersonnel by id
 */
exports.findById = function (id) {
    return db.Employee.find({
        where: { id: id }, attributes: ['id', 'code', "name", "status"],
        include: [
            { model: db.EmployeeRole, attributes: ['id', 'employeeId', 'pdEmployeeRoleId', 'checked'], include: [db.PDEmployeeRole] },
        ]
    });
}

/**
 * Get role
 */
exports.getRole = function () {
    return db.PDEmployeeRole.findAll({
        attributes: ['id', 'code', "description", "status"]
    });
}

// Update Employee and EmployeeRole
exports.update = function (workshop) {

    var objWorkshop = db.Employee.find({
        where: {
            id: workshop.id
        }
    })
    var obj = {}
    objWorkshop.then(result => {
        if (result) {
            obj.updatedDateTime = Date();
            obj.id = workshop.id;
            obj.code = workshop.code;
            obj.name = workshop.name;
            obj.status = workshop.status;
            result.updateAttributes(obj);
        }
    })

    var objEmpRole = db.EmployeeRole.findAll({
        where: {
            employeeId: workshop.id
        }
    })
    objEmpRole.then(result => {
        if (result) {
            result.forEach(element1 => {
                element1.destroy();
            })

        }
    })

    workshop.EmployeeRoles.forEach(element => {
        var objEmployeeRole = {}
        objEmployeeRole.updatedDateTime = new Date();
        objEmployeeRole.employeeId = workshop.id;
        objEmployeeRole.pdEmployeeRoleId = element.id;
        objEmployeeRole.checked = 1;
        objEmployeeRole.isDeleted = 0;
        db.EmployeeRole.build(objEmployeeRole).save();
    })

    return Promise.resolve(true);
}

/**
 * Create workshop Employee and EmployeeRole
 */
exports.create = function (obj) {
    var empId;
    var objEmployee = {}
    objEmployee.isDeleted = 0;
    objEmployee.createdDateTime = Date();
    objEmployee.updatedDateTime = Date();
    objEmployee.status = 1;
    objEmployee.code = obj.code
    objEmployee.name = obj.name
    db.Employee.build(objEmployee).save().then(result => {
        empId = result.dataValues.id

        obj.EmployeeRoles.forEach(element => {
            var objEmployeeRoles = {}
            objEmployeeRoles.isDeleted = 0;
            objEmployeeRoles.createdDateTime = Date();
            objEmployeeRoles.updatedDateTime = Date();
            objEmployeeRoles.checked = 1;
            objEmployeeRoles.employeeId = empId;
            objEmployeeRoles.pdEmployeeRoleId = element.id;
            db.EmployeeRole.build(objEmployeeRoles).save();
        })
    });


    return Promise.resolve(true);
}