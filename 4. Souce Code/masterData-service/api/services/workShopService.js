'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
const messageConstants = require('../constant/messageConstants');
const util = require('util');

/**
 * Returns a list of workshop
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

    return db.WorkShop.findAndCountAll({
        where: filters, order: orderby, offset: skip, limit: limit, row: true
    });
}