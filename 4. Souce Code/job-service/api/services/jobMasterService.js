'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');

exports.getAll = function (searchViewModel) {

    let skip = null,
        limit = null,
        paginator = null;

    paginator = new Paginator(searchViewModel.currentPage, searchViewModel.pageSize);
    limit = paginator.getLimit();
    skip = paginator.getOffset();

    var filters = {
        $and: {
            isDeleted: 0
        }
    };
    var model = searchViewModel.data;

    if (model != null) {
        if (model.code != null) {
            filters.$or = [{
                code: {
                    $like: '%' + model.code + '%'
                }
            }]
        }

        if (model.description != null) {
            filters.$or = [{
                description: {
                    $like: '%' + model.description + '%'
                }
            }]
        }

        if (model.createdBy != null) {
            filters.$or = [{
                createdBy: {
                    $eq: model.createdBy
                }
            }]
        }

        if (model.status != null) {
            filters.$or = [{
                status: {
                    $eq: model.status
                }
            }]
        }

        if (model.modifiedBy != null) {
            filters.$or = [{
                modifiedBy: {
                    $eq: model.modifiedBy
                }
            }]
        }
    }

    let orderby = 'id ASC';
    return db.JobMaster.findAndCountAll({
        where: filters,
        order: orderby,
        offset: skip,
        limit: limit,
        row: true,
        include: [{
            model: db.JobGroup
        }]
    });
}


/**
 * Returns a list of vehicleMake
 * @param   {jobGroupId}   number - The jobGroupId to find
 * @param   {vehicleVariantId} number - the vehicleVariantId to find
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.getListJobByJobGroupId = function (jobGroupId, vehicleVariantId) {
    let orderby = 'id DESC';

    var date = new Date();
    let filters = {};
    filters.$and = [{ isDeleted: 0 }, { status: 1 }]; //{ effectiveFrom: { $gte: date } } TODO: need change 

    if (jobGroupId && jobGroupId != "null") {
        filters.$and.push({
            jobGroupId: {
                $eq: parseInt(jobGroupId)
            }
        });
    }

    var subFilter = {};
    subFilter.$and = [{ isDeleted: 0 }, { status: 1 }];
    if (vehicleVariantId && vehicleVariantId != "null") {
        subFilter.$and.push({
            vehicleVariantId: {
                $eq: parseInt(vehicleVariantId)
            }
        });
    }

    return db.JobMaster.findAll({
        where: filters,
        order: orderby,
        include: [{
            model: db.JobPrice,
            where: subFilter
        }]
    });
}



exports.create = function (jobMaster) {
    jobMaster.isDeleted = 0;
    jobMaster.createdDateTime = Date();
    jobMaster.updatedDateTime = Date();
    jobMaster.status = 1;

    return db.JobMaster
        .build(jobMaster).save();
}

exports.checkExist = function (code) {
    return db.JobMaster.find({
        where: {
            code: code
        }
    });
}

exports.update = function (jobMaster) {
    var task = this.getById(jobMaster.id)
        .then(result => {
            if (result) {
                jobMaster.updatedDateTime = Date();
                return result.updateAttributes(jobMaster);
            }
        })
    return task;
}

exports.getById = function (id) {
    return db.JobMaster.find({
        where: {
            id: id
        },
        include: [{
            model: db.JobPrice
        }]
    });
}

exports.delete = function (id) {
    var task = this.getById(id);
    task.then(result => {
        if (result) {
            return result.updateAttributes({
                isDeleted: 1,
                updatedDateTime: Date()
            });
        }
    })
    return task;
}