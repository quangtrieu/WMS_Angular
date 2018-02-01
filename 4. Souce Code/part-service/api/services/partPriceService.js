'use strict';
const db            = require('../entities');
const Paginator     = require('../../commons/paginator');

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
            filters.$or = [{ partId: { $like: '%' + model.partId + '%' }}]
        }

        if (model.version != null) {
            filters.$or = [{ status: { $eq: model.version }}]
        }

        if (model.netPrice != null) {
            filters.$or = [{ status: { $eq: model.netPrice }}]
        }

        if (model.retailPrice != null) {
            filters.$or = [{ status: { $eq: model.createdDateTime }}]
        }

        if (model.status != null) {
            filters.$or = [{ status: { $eq: model.status }}]
        }

        if (model.createdBy != null) {
            filters.$or = [{ createdBy: { $eq: model.createdBy }}]
        }
    }

    let orderby = 'id DESC';
    return db.PartPrice.findAndCountAll({ where: filters, order: orderby, offset: skip, limit: limit, row: true });
}

/**
 * Get part by id
 */
exports.findById = function (id) {
    return db.PartPrice.find({ where: { id: id } });
    // return db.Customer.find({ where: { id: id }, attributes: ['id', 'name', "description", "status"] });
}

/**
 * Create part
 */
exports.createPartPrice = function (obj, res) {
    obj.isDeleted = 0;
    db.PartPrice.build(obj).save().then(function (result) {
        let response = { success: 1, message: "Add new customer success!" };

        res.json(response);
    }).catch(function (e) {
        let message = "Add new part error!";
        if (e.errors) {
            message = [];
            e.errors.forEach(function (item) {
                message.push(item.message);
            });
        }
        let response = { success: 0, message: message };
        res.json(response);
    });
}

/**
 * Update part
 */
exports.updatePartPrice = function (obj, res) {
    if (obj.id > 0) {
        db.PartPrice.find({
            where: {
                id: obj.id
            }
        }).then(function (part) {
            if (part) {

                part.updateAttributes(obj).then(function (cus) {
                    let response = { success: 1, message: "edit success" };
                    res.json(response);
                }).catch(function (e) {
                    let message = 'Edit part errors!';
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
                let response = { success: "0", message: "not found part with id: " + obj.id };
                res.json(response);
            }
        }).catch(function (e) {
            let response = { success: 0, message: "edit errors!" };
            res.json(response);
        });
    }
}

/**
 * Delete part
 */
exports.deletePartPrice = function (obj, res) {
    db.PartPrice.find({
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