'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');

/**
 * Returns a list of customer
 * @param   {req}   
 * @returns {Promise} resolved customers if found, otherwise resolves undefined
 */
exports.getAll = function (searchViewModel) {

    var searchModel = searchViewModel.data;
    var sortColumn = searchViewModel.sortColumn;
    let skip = null, limit = null, paginator = null;

    paginator = new Paginator(searchViewModel.currentPage, searchViewModel.pageSize);
    limit = paginator.getLimit();
    skip = paginator.getOffset();

    var filtersRO = {};
    filtersRO.$and = [{ isDeleted: 0 }];
    var filtersLPO = {};
    filtersLPO.$and = [{ isDeleted: 0 }];
    var filtersVehicleCustomer = {};
    filtersVehicleCustomer.$and = [];
    var filtersSublet = {};
    filtersSublet.$and = [{ isDeleted: 0 }];
    var filtersPayment = {};
    filtersPayment.$and = [{ isDeleted: 0 }];

    if (searchModel) {
        if (searchModel.roNo) {
            filtersRO.$and.push({ code: { $like: '%' + searchModel.roNo + '%' } })
        }

        if (searchModel.roDate) {
            filtersRO.$and.push({ dateTimeIn: { $eq: searchModel.roDate } })
        }

        if (searchModel.registrationNo) {
            filtersVehicleCustomer.$and.push({ registrationNo: { $like: '%' + searchModel.registrationNo + '%' } })
        }

        if (searchModel.subletName) {
            filtersSublet.$and.push({ subletName: { $like: '%' + searchModel.subletName + '%' } })
        }

        if (searchModel.lpoNo) {
            filtersLPO.$and.push({ code: { $like: '%' + searchModel.lpoNo + '%' } })
        }

        if (searchModel.lpoDate) {
            filtersLPO.$and.push({ createdDateTime: { $eq: searchModel.lpoDate } })
        }
        if (searchModel.paymentTerm) {
            filtersPayment.$and.push({ description: { $like: '%' + searchModel.paymentTerm + '%' } })
        }
    }

    // sorting
    let orderby = 'code DESC';
    if (sortColumn && sortColumn.columnName != null) {
        if (sortColumn.columnName && sortColumn.isAsc) {
            orderby = sortColumn.columnName + ' ASC';
        } else {
            orderby = sortColumn.columnName + ' DESC';
        }
    }

    let includeInfomation = [
        {
            model: db.RepairOrderMaster,
            attributes: ['code', 'dateTimeIn'],
            where: filtersRO,
            include: [
                {
                    model: db.VehicleCustomer,
                    attributes: ['registrationNo'],
                    where: filtersVehicleCustomer,
                }
            ]
        },
        {
            model: db.SubletMaster,
            attributes: ['code', 'subletName'],
            where: filtersSublet
        },
        {
            model: db.PDPaymentTerm,
            attributes: ['code', 'description'],
            where: filtersPayment
        }
    ];

    return db.LocalPOMaster.findAndCountAll({
        where: filtersLPO,
        attributes: ['id', 'code', 'createdDateTime'],
        include: includeInfomation,
        order: orderby,
        offset: skip,
        limit: limit,
        row: true
    });
}

/**
 * Get all PD-data
 */
exports.getPDData = function () {
    let actions = [];

    actions.push(db.PDPaymentTerm.findAll({ where: { isDeleted: 0 }, attributes: ['id', 'code', 'description'] }));
    actions.push(db.PDSubletGST.findAll({ where: { isDeleted: 0 }, attributes: ['id', 'code', 'description'] }));
    actions.push(db.PDDeliveryTo.findAll({ where: { isDeleted: 0 }, attributes: ['id', 'code', 'description'] }));

    return Promise.all(actions).then(results => {
        return {
            pdPaymentTerm: results[0],
            pdGST: results[1],
            pdDeliveryTo: results[2]
        }
    });
}

/**
 * Get LPO by id
 */
exports.getById = function (id) {
    let attributeLPO = ['id', 'code', 'subletId', 'repairOrderId', 'statusId', 'pdPaymentTermId', 'pdGSTId',
        'billTo', 'remark', 'address', 'name', 'pdDeliveryToId',];

    let includePartJob = [
        {
            model: db.LocalPOPart,
            attributes: ['partId', 'unitPrice', 'taxRate', 'taxAmt', 'retailPrice', 'subletInvoiceNo', 'subletInvoiceDate', 'dONo', 'remark'],
            required: false,
            include: {
                model: db.PartMaster,
                attributes: ['code', 'description'],
                where: { isDeleted: 0 },
                required: true
            }
        },
        {
            model: db.LocalPOJob,
            attributes: ['jobId', 'unitPrice', 'taxRate', 'taxAmt', 'retailPrice', 'subletInvoiceNo', 'subletInvoiceDate', 'dONo', 'remark'],
            required: false,
            include: {
                model: db.JobMaster,
                attributes: ['code', 'description'],
                where: { isDeleted: 0 },
                required: true
            }
        },
        {
            model: db.RepairOrderMaster,
            attributes: ['code', 'dateTimeIn'],
            required: true,
            include: {
                model: db.VehicleCustomer,
                attributes: ['registrationNo'],
                required: false,
                where: { isOwner: 1 },
                include: [
                    {
                        model: db.Vehicle,
                        attributes: ['engineNo', 'chassisNo'],
                        where: { isDeleted: 0, status: 1 },
                        required: true
                    },
                    {
                        model: db.Customer,
                        attributes: ['name'],
                        where: { isDeleted: 0, status: 1 },
                        required: true
                    },
                ]    
            }
        }
    ];

    return db.LocalPOMaster.find({ where: { id: id }, attributes: attributeLPO, include: includePartJob });
}

/**
 * Get all RO have sublet job or part
 */
exports.getROBySublet = function (code) {
    let attributesRO = [
        'id', 'code', 'dateTimeIn'
    ];

    let includeROPart = [
        {
            model: db.RepairOrderPart,
            attributes: ['partId', 'pdPartSourceId', 'requestQty'],
            required: false,
            include: {
                model: db.PDPartSource,
                attributes: ['id', 'code'],
                where: { isDeleted: 0, code: "sublet" },
                required: true
            }
        },
        {
            model: db.RepairOrderJob,
            attributes: ['jobId', 'pdJobSourceId'],
            required: false,
            include: {
                model: db.PDJobSource,
                attributes: ['id', 'code'],
                where: { isDeleted: 0, code: "sublet" },
                required: true
            }
        },
        {
            model: db.VehicleCustomer,
            attributes: ['registrationNo'],
            required: false,
            where: { isOwner: 1 },
            include: [
                {
                    model: db.Vehicle,
                    attributes: ['engineNo', 'chassisNo'],
                    where: { isDeleted: 0, status: 1 },
                    required: true
                },
                {
                    model: db.Customer,
                    attributes: ['name'],
                    where: { isDeleted: 0, status: 1 },
                    required: true
                },
            ]
        }
    ];

    return db.RepairOrderMaster.findAll({ where: { code: { $like: '%' + code + '%' } }, attributes: attributesRO, include: includeROPart })
}

/**
 * Get all sublet have part and job
 */
exports.getAllSubletByPartJob = function (partId, jobId) {
    var arrPartId = JSON.parse("[" + partId + "]");
    var arrJobsId = JSON.parse("[" + jobId + "]");

    let attributeSublet = [
        'id', 'code', 'subletName', 'address'
    ];

    let includePartJobSublet = [
        {
            model: db.SubletJob,
            attributes: ['jobId', 'unitPrice'],
            required: true,
            where: {
                jobId: {
                    $in: [arrJobsId]
                },
                active: true,
                isDeleted: 0
            },
            include: [
                {
                    model: db.JobMaster,
                    attributes: ['code', 'description'],
                    where: { isDeleted: 0, status: 1 },
                    required: true,
                    include: [
                        {
                            model: db.JobPrice,
                            attributes: ['retailPrice'],
                            where: { isDeleted: 0, status: 1 },
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            model: db.SubletPart,
            attributes: ['partId', 'unitPrice'],
            required: true,
            where: {
                partId: {
                    $in: [arrPartId]
                },
                active: true,
                isDeleted: 0
            },
            include: [
                {
                    model: db.PartMaster,
                    attributes: ['code', 'description'],
                    where: { isDeleted: 0, status: 1 },
                    required: true,
                    include: [
                        {
                            model: db.PartPrice,
                            attributes: ['netPrice', 'retailPrice'],
                            where: { isDeleted: 0, status: 1 },
                            required: true
                        },
                        {
                            model: db.PDUnitOfMeasure,
                            attributes: ['code'],
                            where: { isDeleted: 0, status: 1 },
                            required: true
                        }
                    ]
                }
            ]
        }
    ];

    return db.SubletMaster.findAll({ attributes: attributeSublet, include: includePartJobSublet })
}

exports.getStatusByCode = function (strcode) {
    return db.PDLPOStatus.find({
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
    var task = db.LocalPOMaster.max('id').then(id => {
        var temp = !Number.isNaN(id) ? (id + 1) : 1;
        var no = "00000000" + temp;
        return "LPO" + no.substr(no.length - 8);
    })
    return task;
}

exports.validate = function (localPOMaster) {
    if (localPOMaster) {
        var listJob = localPOMaster.jobs;
        var listPart = localPOMaster.jobParts;

        // if (listJob) {
        //     if (listJob.filter(e => e.job.unitPrice == null).length > 0) {
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

exports.create = function (localPOMaster) {
    localPOMaster.id = null;
    localPOMaster.isDeleted = 0;
    localPOMaster.createdDateTime = Date();
    localPOMaster.updatedDateTime = Date();
    return this.getStatusByCode('NEW').then(resultCode => {
        if (resultCode) {
            localPOMaster.statusId = resultCode;
            return this.validate(localPOMaster, false).then(result => {
                if (result && !result.success) {
                    return Promise.resolve(result);
                }
                return this.generateNo().then((result) => {
                    localPOMaster.code = result;
                    return db.LocalPOMaster.build(localPOMaster).save().then(function (result) {
                        var listJobs = localPOMaster.jobs;
                        var listParts = localPOMaster.parts;
                        if (listJobs) {
                            var lPOJobs = [];
                            listJobs.forEach(function (element) {
                                element.job = element;
                                element.job.localPOId = result.id;
                                element.job.jobId = element.job.id;
                                element.job.id = null;
                                element.job.createdDateTime = Date();
                                element.job.updatedDateTime = Date();
                                element.job.isDeleted = 0;
                                element.job.active = 1;
                                lPOJobs.push(element.job);
                            });

                            return db.LocalPOJob.bulkCreate(lPOJobs, {
                                individualHooks: true
                            }).then(function (jobResults) {
                                if (jobResults && listParts) {
                                    var lPOParts = [];
                                    listParts.forEach(function (item) {
                                        item.part = item;
                                        item.part.localPOId = result.id;
                                        item.part.partId = item.part.id;
                                        item.part.id = null;
                                        item.part.createdDateTime = Date();
                                        item.part.updatedDateTime = Date();
                                        item.part.isDeleted = 0;
                                        item.part.active = 1;
                                        lPOParts.push(item.part);
                                    });
                                    if (lPOParts) {
                                        return db.LocalPOPart.bulkCreate(lPOParts).then(function (partResult) {
                                            if (partResult) {
                                                return Promise.resolve({ success: true, data: result.id });
                                            }
                                        })
                                    }
                                }
                            })
                        }
                        return Promise.resolve({ success: false, message: messageConstants.REPAIR_ORDER_CREATE_SUCCESS });
                    })
                })
            });
        }
    });
}

exports.filter = function (searchViewModel) {
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
    var searchModel = searchViewModel.data;

    if (searchModel != null) {
        if (searchModel.query) {
            filters.$and.push({
                code: {
                    $like: '%' + searchModel.query + '%'
                }
            })
        }
        // if(searchModel.vehicleMake){
        //     var makeId = parseInt(searchModel.vehicleMake.id);
        //     filters.$and.push({
        //         vehicleMakeId: {
        //             $eq: makeId
        //         }
        //     })
        // }
    }
    
    let orderby = 'id';
    return db.RepairOrderMaster.findAndCountAll({
        where: filters,
        attributes: ['id', 'code' ],
        order: orderby,
        offset: skip,
        limit: limit,
        row: true
    });
}