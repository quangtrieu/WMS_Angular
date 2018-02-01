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
    var model = searchViewModel.data;

    if (model != null) {
        if (model.code != null) {
            filters.$or = [{ code: { $like: '%' + model.code + '%' } }]
        }

        if (model.description != null) {
            filters.$or = [{ description: { $like: '%' + model.description + '%' } }]
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

    let orderby = 'id ASC';
    return db.ServiceAdvisor.findAndCountAll({
        where: filters,
        order: orderby,
        offset: skip,
        limit: limit,
        attributes: ['id', 'name']
    });
}

/**
 * validate form for serviceAdvisor
 */
exports.validate = function (serviceAdvisor) {
    if (serviceAdvisor) {
        if ((serviceAdvisor.name == null || serviceAdvisor.name == "")) {
            return Promise.resolve({ success: false, message: messageConstants.COMMON_NAME_REQUIRED });
        } else if (serviceAdvisor.name.length > 25) {
            return Promise.resolve({ success: false, message: util.format(messageConstants.COMMON_MAXLENGTH, 'name', 25) });
        }
        return Promise.resolve({ success: true });
    }
    return Promise.resolve({ success: false, message: messageConstants.VEHICLE_MAKE_PARAM_REQUIRED });
}


exports.create = function (serviceAdvisor) {
    serviceAdvisor.isDeleted = 0;
    serviceAdvisor.createdDateTime = Date();
    serviceAdvisor.updatedDateTime = Date();
    serviceAdvisor.status = 1;
    return this.validate(serviceAdvisor).then(result => {
        if (result && !result.success) {
            return Promise.resolve(result);
        }
        return db.ServiceAdvisor
            .build(serviceAdvisor).save();
    });


}

exports.update = function (serviceAdvisor) {
    var task = this.getById(serviceAdvisor.id);
    return task.then(result1 => {
        if (result1) {
            return this.validate(serviceAdvisor).then(result => {
                if (result && !result.success) {
                    return Promise.resolve(result);
                }
                serviceAdvisor.updatedDateTime = Date();
                result1.updateAttributes(serviceAdvisor);
                return Promise.resolve(serviceAdvisor);
            })

        }
        return Promise.resolve({ success: false, message: "error" });
    })

}

exports.getById = function (id) {
    return db.ServiceAdvisor.find({ where: { id: id } });
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