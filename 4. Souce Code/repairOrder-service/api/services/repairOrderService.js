'use strict';
const db = require('../entities');
const messageConstants = require('../constant/messageConstants');
const appConstants = require('../constant/appConstants');
const Paginator = require('../../commons/paginator');

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
    var model = searchViewModel.data;
    var sortColumn = searchViewModel.sortColumn;

    // if (model != null) {
    //     if (model.code != null) {
    //         filters.$or = [{ code: { $like: '%' + model.code + '%' } }]
    //     }

    //     if (model.description != null) {
    //         filters.$and.push({ description: { $like: '%' + model.description + '%' } });
    //     }

    //     if (model.status == 0 || model.status == 1) {
    //         filters.$and.push({ status: { $eq: model.status } });
    //     }

    //     if (model.id != null) {
    //         filters.$and.push({ id: { $eq: model.id } });
    //     }

    //     if (model.createdBy != null) {
    //         filters.$and.push({ createdBy: { $eq: model.createdBy } });
    //     }

    //     if (model.modifiedBy != null) {
    //         filters.$and.push({ modifiedBy: { $eq: model.modifiedBy } });
    //     }
    // }

    let orderby = 'id DESC';

    // if (sortColumn && sortColumn.columnName != null) {
    //     if (sortColumn.columnName && sortColumn.isAsc) {
    //         orderby = sortColumn.columnName + ' ASC';
    //     } else {
    //         orderby = sortColumn.columnName + ' DESC';
    //     }
    // }

    return db.RepairOrderMaster.findAndCountAll({
        where: filters,
        order: orderby,
        offset: skip,
        limit: limit,
        row: true,
        include: [{
                model: db.VehicleCustomer,
                include: [{
                        model: db.Customer
                    },
                    {
                        model: db.Vehicle,
                        include: [{
                            model: db.VehicleVariant,
                            include: [{
                                model: db.VehicleModel
                            }]
                        }]
                    }
                ]
            },
            {
                model: db.Appointment
            },
        ]
        // ,order: [
        //     [db.Appointment, 'id', 'DESC'],
        // ]
    });
}

exports.generateNo = function () {
    var task = db.RepairOrderMaster.max('id').then(id => {
        var temp = !Number.isNaN(id) ? (id + 1) : 1;
        var no = "00000000" + temp;
        return "RO" + no.substr(no.length - 8);
    })
    return task;
}

exports.create = function (repairOrderMaster) {
    repairOrderMaster.id = null;
    repairOrderMaster.isDeleted = 0;
    repairOrderMaster.createdDateTime = Date();
    repairOrderMaster.updatedDateTime = Date();
    repairOrderMaster.statusId = appConstants.REPAIR_ORDER_STATUS_NEW;
    repairOrderMaster.workShopId = 1;
    repairOrderMaster.dateTimeIn = new Date();

    return this.validate(repairOrderMaster, false).then(result => {
        if (result && !result.success) {
            return Promise.resolve(result);
        }

        return this.generateNo().then((result) => {
            repairOrderMaster.code = result;
            return this.isExistCode(repairOrderMaster.code).then(result => {
                if (result && result != 0) {
                    return Promise.resolve({
                        success: false,
                        message: messageConstants.REPAIR_ORDER_EXIST_CODE
                    });
                } else {
                    return db.RepairOrderMaster.build(repairOrderMaster).save().then(function (result) {
                        var listJobs = repairOrderMaster.jobs;
                        var listJobParts = repairOrderMaster.jobParts;

                        if (listJobs) {
                            var repairOrderJobs = [];
                            var listRepairOrderPart = [];

                            listJobs.forEach(function (element) {
                                element.job.repairOrderId = result.id;
                                element.job.servicePackageId = element.servicePackageId;
                                element.job.jobId = element.job.id;
                                element.job.id = null;
                                element.job.flatRate = 0;
                                element.job.subTotal = element.job.labourCharge;
                                element.job.pdJobStatusId = appConstants.PD_JOB_STATUS_NEW;

                                listRepairOrderPart[element.job.jobId] = element.job.parts;
                                repairOrderJobs.push(element.job);
                            });

                            return db.RepairOrderJob.bulkCreate(repairOrderJobs, {
                                individualHooks: true
                            }).then(function (jobResults) {
                                if (jobResults && listJobParts) {
                                    var repairOrderParts = [];
                                    listJobParts.forEach(function (item) {
                                        if (item.part) {
                                            var partItem = item.part;

                                            var quantity = (item.part && item.part.quantity) ? item.part.quantity : 0;
                                            var unitPrice = (item.part && item.part.unitPrice) ? item.part.unitPrice : 0;

                                            partItem.partId = (item.part.id) ? item.part.id: item.partId;
                                            partItem.repairOrderId = result.id;
                                            partItem.jobId = item.id;
                                            partItem.requestQty = quantity;
                                            partItem.unitPrice = unitPrice;
                                            partItem.subTotal = quantity * unitPrice;
                                            partItem.servicePackageId = item.servicePackageId;
                                            partItem.id = null;

                                            repairOrderParts.push(partItem);
                                        }
                                    });
                                    if (repairOrderParts) {
                                        return db.RepairOrderPart.bulkCreate(repairOrderParts).then(function (partResult) {
                                            if (partResult) {
                                                return Promise.resolve({
                                                    success: true,
                                                    data: result.id
                                                });
                                            }
                                        })
                                    }
                                }
                            })
                        }
                        return Promise.resolve({
                            success: false,
                            message: messageConstants.REPAIR_ORDER_CREATE_SUCCESS
                        });
                    })
                }
            });
        });
    });
}

exports.isExistCode = function (code) {
    return db.RepairOrderMaster.find({
        where: {
            code: code
        }
    });
}

exports.validate = function (repairOrderMaster) {
    if (repairOrderMaster) {
        var listJob = repairOrderMaster.jobs;
        var listJobPart = repairOrderMaster.jobParts;

        if (listJob) {
            if (listJob.filter(e => e.job.pdComeBackJobId == null).length > 0) {
                return Promise.resolve({
                    success: false,
                    message: messageConstants.REPAIR_ORDER_COMEBACK_JOB_REQUIRED
                });
            }
            if (listJob.filter(e => e.job.pdPaymentTypeId == null).length > 0) {
                return Promise.resolve({
                    success: false,
                    message: messageConstants.REPAIR_ORDER_PAYMENT_TYPE_REQUIRED
                });
            }
            if (listJob.filter(e => e.job.pdJobSourceId == null).length > 0) {
                return Promise.resolve({
                    success: false,
                    message: messageConstants.REPAIR_ORDER_JOB_SOURCE_REQUIRED
                });
            }
        }

        if (listJobPart) {
            if (listJobPart.filter(e => e.part.pdPartSourceId == null).length > 0) {
                return Promise.resolve({
                    success: false,
                    message: messageConstants.REPAIR_ORDER_PART_SOURCE_REQUIRED
                });
            }
            if (listJobPart.filter(e => e.part.pdPaymentTypeId == null).length > 0) {
                return Promise.resolve({
                    success: false,
                    message: messageConstants.REPAIR_ORDER_PAYMENT_TYPE_REQUIRED
                });
            }
        }

        return Promise.resolve({
            success: true
        });
    }

    return Promise.resolve({
        success: false,
        message: messageConstants.REPAIR_ORDER_PARAM_REQUIRED
    });
}

exports.update = function (repairOrderMaster) {
    return this.validate(repairOrderMaster, false).then(result => {
        if (result && !result.success) {
            return Promise.resolve(result);
        }
        var foundedRepairOrder = this.getById(repairOrderMaster.id);
        return foundedRepairOrder.then(result => {
            if (result) {
                repairOrderMaster.updatedDateTime = Date();
                return result.updateAttributes(repairOrderMaster).then(result => {
                    if (result) {
                        var listJobs = repairOrderMaster.jobs;
                        var listJobParts = repairOrderMaster.jobParts;
                        var listJobDeleted = repairOrderMaster.jobsDeleted;
                        var listPartDeleted = repairOrderMaster.partsDeleted;

                        if (listJobs) {
                            db.RepairOrderJob.findAll({
                                where: {
                                    repairorderId: result.id
                                }
                            }).then(function (listRepairOrderJob) {
                                if (listRepairOrderJob !== null && listRepairOrderJob) {

                                    listJobs.forEach(item => {
                                        var repairOrderJobId = item.job.repairOrderJobId;
                                        var repairOrderJob = listRepairOrderJob.filter(e => e.id === repairOrderJobId);

                                        var jobItem = {
                                            repairOrderId: result.id,
                                            jobId: item.job.id,
                                            pdComeBackJobId: item.job.pdComeBackJobId,
                                            pdPaymentTypeId: item.job.pdPaymentTypeId,
                                            pdJobSourceId: item.job.pdJobSourceId,
                                            pdJobStatusId: appConstants.PD_JOB_STATUS_NEW,
                                            servicePackageId: item.job.servicePackageId,
                                            flatRate: 0,
                                            labourCharge: item.job.labourCharge,
                                            subTotal: item.job.labourCharge,
                                            updatedDateTime: new Date(),
                                            discountPercent: item.job.discountPercent,
                                            discountAmt: item.job.discountAmt,
                                            goodWillPercent: item.job.goodWillPercent,
                                            goodWillAmt: item.job.goodWillAmt,
                                            netAmt: item.job.netAmt
                                        };

                                        if (repairOrderJob && repairOrderJobId) {
                                            db.RepairOrderJob.update(jobItem, {
                                                where: {
                                                    id: repairOrderJobId
                                                }
                                            });
                                        } else {
                                            db.RepairOrderJob.build(jobItem).save(); // case add new
                                        }
                                    });

                                    //check case delete
                                    if (listJobDeleted) {
                                        listJobDeleted.forEach(id => {
                                            var repairOrderJob = listRepairOrderJob.filter(e => e.id === id);
                                            if (repairOrderJob) {
                                                db.RepairOrderJob.update({
                                                    isDeleted: true,
                                                    updatedDateTime: new Date()
                                                }, {
                                                    where: {
                                                        id: id
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        }

                        if (listJobParts) {
                            db.RepairOrderPart.findAll({
                                where: {
                                    repairorderId: result.id
                                }
                            }).then(function (listRepairOrderPart) {
                                if (listRepairOrderPart !== null && listRepairOrderPart) {
                                    listJobParts.forEach(item => {
                                        var repairOrderPartId = item.part.repairOrderPartId;
                                        var repairOrderPart = listRepairOrderPart.filter(e => e.id === repairOrderPartId);

                                        var partItem = {};

                                        var quantity = (item.part && item.part.quantity) ? item.part.quantity : 0;
                                        var unitPrice = (item.part && item.part.unitPrice) ? item.part.unitPrice : 0;

                                        partItem.repairOrderId = result.id;
                                        partItem.jobId = item.jobId;
                                        partItem.partId = item.part.partId;
                                        partItem.pdPartSourceId = item.part.pdPartSourceId;
                                        partItem.pdPaymentTypeId = item.part.pdPaymentTypeId;
                                        partItem.requestQty = quantity;
                                        partItem.unitPrice = unitPrice;
                                        partItem.subTotal = quantity * unitPrice;
                                        partItem.servicePackageId = item.part.servicePackageId;
                                        partItem.flatRate = 0;
                                        partItem.discountPercent = item.part.discountPercent;
                                        partItem.discountAmt = item.part.discountAmt;
                                        partItem.goodWillPercent = item.part.goodWillPercent;
                                        partItem.goodWillAmt = item.part.goodWillAmt;
                                        partItem.netAmt = item.part.netAmt;

                                        if (repairOrderPart && repairOrderPartId) {
                                            db.RepairOrderPart.update(partItem, {
                                                where: {
                                                    id: repairOrderPartId
                                                }
                                            });
                                        } else {
                                            db.RepairOrderPart.build(partItem).save(); // case add new
                                        }
                                    });

                                    //check case delete
                                    if (listPartDeleted) {
                                        listPartDeleted.forEach(id => {
                                            var repairOrderPart = listRepairOrderPart.filter(e => e.id === id);
                                            if (repairOrderPart) {
                                                db.RepairOrderPart.update({
                                                    isDeleted: true,
                                                    updatedDateTime: new Date()
                                                }, {
                                                    where: {
                                                        id: id
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        }
                        return Promise.resolve({
                            success: true,
                            message: messageConstants.REPAIR_ORDER_UPDATE_SUCCESS
                        });
                    }
                });
            }
        });
    });
}

exports.getById = function (id) {
    return db.RepairOrderMaster.find({
        where: {
            id: id
        }
    });
}

exports.getFullRepairOrderById = function (id) {
    var filters = {};
    filters.$and = [{
        isDeleted: 0
    }];
    filters.$or = [{
        isDeleted: {
            $ne: null
        }
    }];

    return db.RepairOrderMaster.find({
        where: {
            id: parseInt(id)
        },
        include: [{
            model: db.RepairOrderJob,
            where: filters,
            include: [{
                model: db.JobMaster,
                attributes: ['id', 'code', 'description'],
            }, {
                model: db.ServicePackageMaster
            }],
            required: false
        }, {
            model: db.RepairOrderPart,
            where: filters,
            include: [{
                model: db.PartMaster,
                attributes: ['id', 'code', 'description']
            }, {
                model: db.JobMaster,
            }],
            required: false
        }, {
            model: db.VehicleCustomer,
            include: [{
                model: db.Vehicle,
                attributes: ['id', 'vehicleVariantId', 'engineNo', 'chassisNo'],
                include: [{
                    model: db.VehicleVariant,
                    attributes: ['id', 'code', 'vehicleModelId', 'description'],
                    include: [{
                        model: db.VehicleModel,
                        attributes: ['id', 'code', 'vehicleMakeId', 'description'],
                        include: [{
                            model: db.VehicleMake,
                            attributes: ['id', 'code', 'description'],
                        }]
                    }]
                }]
            }, {
                model: db.Customer,
                attributes: ['id', 'code', 'name'],
            }]
        }]
    }).catch(err => {
        console.log(err);
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

/**
 * Get RO no by Appointment ID
 */
exports.findByNo = function (data) {
    var idArray = JSON.parse(data.ids);
    return db.RepairOrderMaster.findAll({
        attributes: ['id', 'appointmentId'],
        where: {
            id: {
                $in: [idArray]
            }
        }
    });
}

exports.getAllPaymentType = function () {
    return db.PDPaymentType.findAll({
        row: true
    });
}

exports.getRepairOrderJobs = function (repairOrderId) {
    return db.RepairOrderMaster.find({
        where: {
            id: repairOrderId
        },
        include: [{
            model: db.RepairOrderJob,
            attributes: ['id'],
            include: [{
                model: db.JobMaster
            }]
        }]
    }).then(repairOrder => {
        var repairOrderJobs = [];
        if (repairOrder && repairOrder.RepairOrderJobs) {
            return repairOrder.RepairOrderJobs;
        }
        return repairOrderJobs;
    });
}

exports.getRepairOrderHistories = function (vehicleCustomerId) {
    return db.RepairOrderMaster.findAll({
        where: {
            vehicleCustomerId: vehicleCustomerId
        },
        include: [{
                model: db.InvoiceMaster,
                required: true
            },
            {
                model: db.WorkShop
            }
        ]
    }).then(repairOrders => {
        var data = [];
        if (repairOrders) {
            repairOrders.forEach(item => {
                if (item.InvoiceMasters && item.InvoiceMasters.length > 0) {
                    var invoice = item.InvoiceMasters[0];
                    var amount = (invoice.totalLabourCharge ? invoice.totalLabourCharge : 0) +
                                 (invoice.totalPartAmt ? invoice.totalPartAmt : 0);
                    var workShop = '';
                    if (item.WorkShop)
                        workShop = item.WorkShop.code + ' - ' + item.WorkShop.name;
                    data.push({
                        invoiceAmount: amount,
                        invoiceNo: invoice.code,
                        invoiceDate: invoice.createdDateTime,
                        roNo: item.code,
                        roDate: item.createdDateTime,
                        workShop: workShop
                    })
                }
            });
        }
        return data;
    });
}