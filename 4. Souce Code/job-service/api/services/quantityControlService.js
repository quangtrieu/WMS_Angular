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
        isDeleted: 0,
        jobFulfilmentStatusId: 4,
    }];
    var filtersRO = {};
    filtersRO.$and = [{ isDeleted: 0 }];
    var filtersStatus = {};
    filtersStatus.$and = [{ isDeleted: 0 }];
    var filtersVehicleCustomer = {};
    filtersVehicleCustomer.$and = [];
    var filtersCustomer = {};
    filtersCustomer.$and = [{ isDeleted: 0 }];
    var searchModel = searchViewModel.data;
    var sortColumn = searchViewModel.sortColumn;

    if (searchModel != null) {
        if (searchModel.invoiceNo) {
            filters.$and.push({ code: { $like: searchModel.invoiceNo + '%' } });
        }

        if (searchModel.invoiceDate) {
            filters.$and.push({ createdDateTime: { $like: '%' + searchModel.invoiceDate + '%' } });
        }

        if (searchModel.status) {
            filtersStatus.$and.push({ code: { $like: '%' + searchModel.status + '%' } });
        }

        if (searchModel.roNo) {
            filtersRO.$and.push({ code: { $like: '%' + searchModel.roNo + '%' } });
        }

        if (searchModel.roDate) {
            filtersRO.$and.push({ dateTimeIn: { $like: '%' + searchModel.roDate + '%' } });
        }

        if (searchModel.registrationNo) {
            filtersVehicleCustomer.$and.push({ registrationNo: { $like: '%' + searchModel.registrationNo + '%' } });
        }

        if (searchModel.customerName) {
            filtersCustomer.$and.push({ name: { $like: '%' + searchModel.customerName + '%' } });
        }

        if (searchModel.totalAfterTaxAmt) {
            filters.$and.push({ totalAfterTaxAmt: { $like: '%' + searchModel.totalAfterTaxAmt + '%' } });
        }
    }

    let orderby = 'id';
    if (sortColumn && sortColumn.columnName != null) {
        if (sortColumn.columnName && sortColumn.isAsc) {
            orderby = sortColumn.columnName + ' ASC';
        } else {
            orderby = sortColumn.columnName + ' DESC';
        }
    }

    return db.JobFulfilment.findAndCountAll({
        where: filters,
        order: orderby,
        offset: skip,
        limit: limit,
        row: true, include: [{ model: db.RepairOrderMaster, include: [{ model: db.VehicleCustomer, include: [{ model: db.Customer }] }] }, { model: db.PDJobFulfilmentStatus }]
    });
}

/**
 * Get getJobFFItem by id
 */
exports.getJobFFItem = function (id) {
    return db.JobFulfilmentItem.findAll({
        where: {
            jobFulfilmentId: id
        },
        include: [
            {
                model: db.JobFulfilment, include: [
                    {
                        model: db.RepairOrderMaster, include: [
                            {
                                model: db.VehicleCustomer, include: [
                                    { model: db.Customer },
                                    { model: db.Vehicle }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                model: db.RepairOrderJob, include: [
                    { model: db.JobMaster }
                ]
            },
        ]
    });
}




