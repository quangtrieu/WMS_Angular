'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');

/**
 * Returns a list of vehicleMake
 * @param   {SearchViewModel}   searchViewModel - The model search to find
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.getall = function (searchViewModel) {
    let skip = null, limit = null, paginator = null;

    paginator = new Paginator(searchViewModel.currentPage, searchViewModel.pageSize);
    limit = paginator.getLimit();
    skip = paginator.getOffset();

    var filters = {};
    filters.$and = [{ isDeleted: 0 }];
    var model = searchViewModel.data;
    var sortColumn = searchViewModel.sortColumn;

    if (model != null) {
        if (model.code != null) {
            filters.$or = [{ code: { $like: '%' + model.code + '%' } }]
        }

        if (model.description != null) {
            filters.$and.push({ description: { $like: '%' + model.description + '%' } });
        }

        if (model.status == 0 || model.status == 1) {
            filters.$and.push({ status: { $eq: model.status } });
        }

        if (model.id != null) {
            filters.$and.push({ id: { $eq: model.id } });
        }

        if (model.createdBy != null) {
            filters.$and.push({ createdBy: { $eq: model.createdBy } });
        }

        if (model.modifiedBy != null) {
            filters.$and.push({ modifiedBy: { $eq: model.modifiedBy } });
        }
    }

    let orderby = 'id DESC';

    if (sortColumn && sortColumn.columnName != null) {
        if (sortColumn.columnName && sortColumn.isAsc) {
            orderby = sortColumn.columnName + ' ASC';
        } else {
            orderby = sortColumn.columnName + ' DESC';
        }
    }

    return db.PartMaster.findAndCountAll({ where: filters, order: orderby, offset: skip, limit: limit, row: true, include: [{ model: db.PartPrice }] });
}

/**
 * Returns a list of part by workshopId
 * @param   {workShopId}   number - The workShopId to find
 * @param   {vehicleVariantId}   number - The vehicleVariantId to find
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.getListPartByWorkShopId = function (workShopId, vehicleVariantId) {
    let orderby = 'id DESC';

    let filters = {};
    filters.$and = [{ isDeleted: 0 }];

    if (workShopId) {
        filters.$and.push({ workShopId: { $eq: parseInt(workShopId) } });
    }

    var includePrice = [];
    if (vehicleVariantId) {
        includePrice.push({ model: db.PartPrice, where: { vehicleVariantId: { $eq: parseInt(vehicleVariantId) } } });
    }

    return db.PartMaster.findAll({ where: filters, order: orderby, include: includePrice, row: true });
}

/**
 * Get part by id
 */
exports.findById = function (id) {
    return db.PartMaster.find({ where: { id: id } });
    // return db.Customer.find({ where: { id: id }, attributes: ['id', 'name', "description", "status"] });
}

/**
 * Check exist customer code
 */
exports.checkExistPartMaster = function (code) {
    return db.PartMaster.find({
        where: {
            id: code
        }
    })
}

/**
 * Create part
 */
exports.createPartMaster = function (obj, res) {
    obj.isDeleted = 0;
    obj.createdDateTime = Date();
    obj.updatedDateTime = Date();
    obj.workShopId = 0;
    return db.PartMaster.build(obj).save();
}

/**
 * Update part
 */
exports.updatePartMaster = function (obj, res) {
    var objCustomer = db.PartMaster.find({
        where: {
            id: obj.id
        }
    })
    objCustomer.then(result => {
        if (result) {
            obj.updatedDateTime = Date();
            return result.updateAttributes(obj);
        }
    })
    return objCustomer;
}

/**
 * Delete part
 */
exports.deletePartMaster = function (obj, res) {
    db.PartMaster.find({
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
 * Get part substitute
 */
exports.getPartSubstitute = function (objPartInfo) {
    var array = JSON.parse("[" + objPartInfo.partListId + "]");
    let orderby = 'id DESC';
    
    let filters = {};
    filters.$and = [{ status: 1 }];

    let filtersPart = {};
    filtersPart.$and = [{ isDeleted: 0 }];

    if (objPartInfo){
        if (objPartInfo.workshopId) {
            filtersPart.$and.push({ workshopId: parseInt(objPartInfo.workshopId) })
        }
        if (objPartInfo.partListId){
            filters.$and.push({partId: {in: array }})
        }
    }

    let attributesPartSubstitutes = ['partId'];

    let includePartMaster = [
        {
            model: db.PartMaster,
            attributes: ['id', 'code', 'description'],
            where: filtersPart,
            required: false
        }
    ];

    return db.PartSubstitute.findAll({ attributes: attributesPartSubstitutes, where: filters, order: orderby, include: includePartMaster });
}