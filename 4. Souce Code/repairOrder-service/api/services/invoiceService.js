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
        isDeleted: 0
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

    let orderby = 'code';
    if (sortColumn && sortColumn.columnName != null) {
        if (sortColumn.columnName && sortColumn.isAsc) {
            orderby = sortColumn.columnName + ' ASC';
        } else {
            orderby = sortColumn.columnName + ' DESC';
        }
    }

    let includeROAndStatusInfomation = [
        {
            model: db.RepairOrderMaster,
            attributes: ['code', 'dateTimeIn'],
            where: filtersRO,
            include: [
                {
                    model: db.VehicleCustomer,
                    attributes: ['registrationNo'],
                    where: filtersVehicleCustomer,
                    include: [
                        {
                            model: db.Customer,
                            attributes: ['name'],
                            where: filtersCustomer
                        }
                    ]
                }
            ]
        },
        {
            model: db.PDInvoiceStatus,
            attributes: ['code'],
            where: filtersStatus
        }
    ];

    return db.InvoiceMaster.findAndCountAll({
        where: filters,
        attributes: ['id', 'code', 'createdDateTime', 'totalAfterTaxAmt'],
        include: includeROAndStatusInfomation,
        order: orderby,
        offset: skip,
        limit: limit,
        row: true
    });
}

exports.getROById = function (code) {

    let includeInfomation = [
        {
            model: db.VehicleCustomer,
            include: [
                {
                    model: db.Customer
                },
                {
                    model: db.Vehicle,
                        include: [
                            db.VehicleVariant,
                        ]
                }
            ]
        },
        {
            model: db.ServiceAdvisor
        },
        {
            model: db.PDRepairOrderStatus
        },
        {
            model: db.RepairOrderJob,
            include: [
                {
                    model: db.JobMaster,
                    attributes: ['id', 'code', 'description'],
                },
                {
                    model: db.ServicePackageJob,
                    include: [{
                        model: db.ServicePackageVariant,
                        include: [{
                            model: db.ServicePackageMaster,
                        }]
                    }]
                }]
        },
        {
            model: db.RepairOrderPart,
            include: [{
                model: db.PartMaster,
                attributes: ['id', 'code', 'description']
            },
            {
                model: db.JobMaster,
            },
            {
                model: db.PDPartSource,
            }]
        }
    ];

    return db.RepairOrderMaster.find({
        where: {
            code: code,
            statusId: 2
        },
        include: includeInfomation,
    });
}

/**
 * Get invoice by id
 */
exports.getById = function (id) {

    let includeInfomation = [
        {
            model: db.RepairOrderMaster,
            include: [
                {
                    model: db.VehicleCustomer,
                    include: [{
                        model: db.Customer,
                    },
                    {
                        model: db.Vehicle,
                        include: [
                            db.VehicleVariant,
                        ]
                    }]
                }
            ]
        },
        {
            model: db.PDInvoiceStatus
        },
        {
            model: db.ServiceAdvisor
        },
        {
            model: db.InvoiceJob,
            include: [
                {
                    model: db.JobMaster,
                    attributes: ['id', 'code', 'description'],
                },
                {
                    model: db.ServicePackageJob,
                    include: [{
                        model: db.ServicePackageVariant,
                        include: [{
                            model: db.ServicePackageMaster,
                        }]
                    }]
                }]
        },
        {
            model: db.InvoicePart,
            include: [{
                model: db.PartMaster,
            },
            {
                model: db.JobMaster,
            },
            {
                model: db.PDPartSource,
            }]
        }
    ];

    return db.InvoiceMaster.find({
        where: {
            id: id
        },
        include: includeInfomation,
    });
}


exports.getStatusByCode = function (strcode) {
    return db.PDInvoiceStatus.find({
        where: {
            code: strcode
        }
    }).then(result => {
        if (result) {
            return result.dataValues.id
        }
        else {
            return null;
        }
    });
}

exports.generateNo = function () {
    var task = db.InvoiceMaster.max('id').then(id => {
        var temp = !Number.isNaN(id) ? (id + 1) : 1;
        var no = "00000000" + temp;
        return "INV" + no.substr(no.length - 8);
    })
    return task;
}

exports.validate = function (invoiceMaster) {
    if (invoiceMaster) {
        var listJob = invoiceMaster.jobs;
        var listPart = invoiceMaster.jobParts;

        // if (listJob) {
        //     if (listJob.filter(e => e.job.labourCharge == null).length > 0) {
        //         return Promise.resolve({ success: false, message: 'error' });
        //     }
        // }

        // if (listPart) {
        //     if (listJobPart.filter(e => e.part.unitPrice == null).length > 0) {
        //         return Promise.resolve({ success: false, message: 'error' });
        //     }
        // }

        return Promise.resolve({ success: true });
    }

    return Promise.resolve({
        success: false,
        message: messageConstants.REPAIR_ORDER_PARAM_REQUIRED
    });
}

exports.create = function (invoiceMaster) {
    invoiceMaster.id = null;
    invoiceMaster.isDeleted = 0;
    invoiceMaster.createdDateTime = Date();
    invoiceMaster.updatedDateTime = Date();
    return this.getStatusByCode('NEW').then(resultCode => {
        if (resultCode){
            invoiceMaster.statusId = resultCode;
            return this.validate(invoiceMaster, false).then(result => {
                if (result && !result.success) {
                    return Promise.resolve(result);
                }
                return this.generateNo().then((result) => {
                    invoiceMaster.code = result;
                    return db.InvoiceMaster.build(invoiceMaster).save().then(function (result) {
                        var listJobs = invoiceMaster.jobs;
                        var listParts = invoiceMaster.parts;
                        if (listJobs) {
                            var invoiceJobs = [];
                            listJobs.forEach(function (element) {
                                element.job = element;
                                element.job.invoiceId = result.id;
                                element.job.servicePackageId = element.servicePackageId;
                                element.job.jobId = element.job.id;
                                element.job.id = null;
                                element.job.discount = element.discountAmt;
                                element.job.createdDateTime = Date();
                                element.job.updatedDateTime = Date();
                                element.job.isDeleted = 0;
                                element.job.active = 1;
                                invoiceJobs.push(element.job);
                            });
        
                            return db.InvoiceJob.bulkCreate(invoiceJobs, {
                                individualHooks: true
                            }).then(function (jobResults) {
                                if (jobResults && listParts) {
                                    var invoiceParts = [];
                                    listParts.forEach(function (item) {
                                        item.part = item;
                                        item.part.invoiceId = result.id;
                                        item.part.id = null;
                                        item.part.createdDateTime = Date();
                                        item.part.updatedDateTime = Date();
                                        item.part.isDeleted = 0;
                                        item.part.active = 1;
                                        invoiceParts.push(item.part);
                                    });
                                    if (invoiceParts) {
                                        return db.InvoicePart.bulkCreate(invoiceParts).then(function (partResult) {
                                            if (partResult) {
                                                return Promise.resolve(true);
                                            }
                                        })
                                    }
                                }
                            })
                        }
                        return Promise.resolve({ success: false, message: messageConstants.REPAIR_ORDER_CREATE_FAIL});
                    })
                })
            });
        }
        
    });
}