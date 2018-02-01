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
    return db.JobGroup.findAndCountAll({
        where: filters,
        order: orderby,
        offset: skip,
        limit: limit,
        row: true
    });
}


exports.create = function (jobGroup) {
    jobGroup.isDeleted = 0;
    jobGroup.createdDateTime = Date();
    jobGroup.updatedDateTime = Date();
    jobGroup.status = 1;

    return db.JobGroup
        .build(jobGroup).save();
}

exports.checkExist = function (code) {
    return db.JobGroup.find({
        where: {
            code: code
        }
    });
}

exports.update = function (jobGroup) {
    var task = this.getById(jobGroup.id)
        .then(result => {
            if (result) {
                jobGroup.updatedDateTime = Date();
                return result.updateAttributes(jobGroup);
            }
        })
    return task;
}

exports.getById = function (id) {
    return db.JobGroup.find({
        where: {
            id: id
        }
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