'use strict';
var Sequelize = require('sequelize');
const db = require('../entities').db;
const Paginator = require('../../../tceas-utils/utils/paginator');
const enums = require('../../../tceas-utils/constant/enums');
const messageConstants = require('../constant/messageConstants');

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
    var filterCustomers = {};
    // filterCustomers.$and = [{
    //     isDeleted: 0
    //}];
    var filterVehicleCustomer = {};
    // filterVehicleCustomer.$and = [{
    //     isDeleted: 0
    // }];
     var filterVehicle = {};
    // filterVehicle.$and = [{
    //     isDeleted: 0
    // }];
    var model = searchViewModel.data;
    var sortColumn = searchViewModel.sortColumn;

    if (model != null) {
        if (model.code != null) {
            filters.$or = [{ code: { $like: '%' + model.code + '%' } }]
        }

        if (model.appointmentDate != null) {
            filters.$and.push({ timeSlotDate: { $like: '%' + model.appointmentDate + '%' } });
        }

        if (model.customer != null) {
            filterCustomers.$and.push({ name: { $like: '%' + model.customer + '%' } });
        }

        if (model.registrationNo != null) {
            filterVehicleCustomer.$and.push({ registrationNo: { $like: '%' + model.registrationNo + '%' } });
        }

        if (model.vehicle != null) {
            filterVehicle.$and.push({ code: { $like: '%' + model.vehicle + '%' } });
        }
    }

    let orderby = 'id DESC';

    // if (sortColumn && sortColumn.columnName != null) {
    //     if (sortColumn.columnName && sortColumn.isAsc) {
    //         orderby = sortColumn.columnName + ' ASC';
    //     } else {
    //         orderby = sortColumn.columnName + ' DESC';
    //     }
    // }
    return db.Appointment.findAndCountAll({
        where: filters,
        order: orderby,
        offset: skip,
        limit: limit,
        row: true,
        include: [{
            model: db.VehicleCustomer,
            where: filterVehicleCustomer,
            include: [{
                model: db.Customer,
                where: filterCustomers,
            }, {
                model: db.Vehicle,
                where: filterVehicle,
                include: [{
                    model: db.VehicleVariant
                }]
            }]
        }, {
            model: db.TimeSlotDetail
        }]
    });
}

exports.getAllAppointmentByRegistrationNo = function (workShopId, registrationNo) {
    var filters = {};
    filters.$and = [{ isDeleted: 0 }];

    if (workShopId && workShopId != "null") {
        filters.$and.push({ workShopId: { $eq: workShopId } });
    }

    if (registrationNo && registrationNo != "null") {
        filters.$and.push({ workShopId: { $eq: workShopId } });
    }

    return db.Appointment.findAll({
        where: filters,
        include: [{
            model: db.VehicleCustomer,
            where: { registrationNo: { $eq: registrationNo } },
        }]
    });
}

exports.create = async function (appointment) {
    appointment.isDeleted = 0;
    appointment.createdDateTime = Date();
    appointment.updatedDateTime = Date();
    appointment.appointmentStatusId = enums.appointmentStatus.NEW;
    if (appointment.timeSlotDetail) {
        appointment.timeSlotDate = appointment.timeSlotDetail.timeSlotDate;
        appointment.timeSlotDetailId = appointment.timeSlotDetail.id;
    }
    var result = this.validate(appointment);
    if (result && !result.success) {
        return Promise.resolve(result);
    }
    var appointmentNo = await this.generateNo();
    appointment.appointmentNo = appointmentNo;
    var isExistCode = await this.checkExistByNo(appointment.appointmentNo);
    if (isExistCode) {
        return Promise.resolve({
            success: false,
            message: messageConstants.APPOINMENT_EXIST_CODE
        });
    }
    result = await db.Appointment.build(appointment).save();
    var listJobs = appointment.jobs;
    var listJobParts = appointment.jobParts;
    if (listJobs) {
        var appointmentJobs = [];
        var listAppointmentPart = [];

        listJobs.forEach(function (element) {
            element.job = element.job;
            element.job.appointmentId = result.id;
            element.job.servicePackageId = element.servicePackageId;
            element.job.jobId = element.job.id;
            element.job.id = null;
            element.job.flatRate = 0;
            element.job.subTotal = element.job.labourCharge;
            element.job.pdJobStatusId = enums.jobStatus.NEW;

            listAppointmentPart[element.job.jobId] = element.job.parts;
            appointmentJobs.push(element.job);
        });

        var jobResults = await db.AppointmentJob.bulkCreate(appointmentJobs, {
            individualHooks: true
        });

        if (jobResults && listJobParts) {
            var appointmentParts = [];
            listJobParts.forEach(function (item) {
                if (item.part) {
                    var partItem = item.part;

                    var quantity = (item.part && item.part.quantity) ? item.part.quantity : 0;
                    var unitPrice = (item.part && item.part.unitPrice) ? item.part.unitPrice : 0;

                    partItem.partId = item.part.id;
                    partItem.appointmentId = result.id;
                    partItem.jobId = item.id;
                    partItem.requestQty = quantity;
                    partItem.unitPrice = unitPrice;
                    partItem.subTotal = quantity * unitPrice;
                    partItem.id = null;
                    partItem.servicePackageId = item.servicePackageId;

                    appointmentParts.push(partItem);
                }
            });
            if (appointmentParts) {
                var partResult = await db.AppointmentPart.bulkCreate(appointmentParts);
                if (partResult) {
                    return Promise.resolve({
                        success: true,
                        data: result.id,
                        message: messageConstants.APPOINMENT_CREATE_SUCCESS
                    });
                }
            }
        }
    }
    return Promise.resolve({
        success: false,
        message: messageConstants.APPOINMENT_CREATE_FAIL
    });
}

exports.checkExistByNo = function (appointmentNo) {
    return db.Appointment.find({
        where: {
            appointmentNo: appointmentNo
        }
    });
}

exports.update = async function (appointment) {
    var result = this.validate(appointment);
    if (result && !result.success) {
        return Promise.resolve(result);
    }
    result = await this.getById(appointment.id);
    if (result) {
        appointment.updatedDateTime = Date();
        result = await result.updateAttributes(appointment);
        if (result) {
            var listJobs = appointment.jobs;
            var listJobParts = appointment.jobParts;
            var listJobDeleted = appointment.jobsDeleted;
            var listPartDeleted = appointment.partsDeleted;

            if (listJobs) {
                var listAppointmentJob = await db.AppointmentJob.findAll({
                    where: {
                        appointmentId: result.id
                    }
                });
                if (listAppointmentJob !== null && listAppointmentJob) {
                    listJobs.forEach(item => {
                        var appointmentJobId = item.job.appointmentJobId;
                        var appointmentJob = listAppointmentJob.filter(e => e.id === appointmentJobId);

                        var jobItem = {
                            appointmentId: result.id,
                            jobId: item.job.id,
                            pdComeBackJobId: item.job.pdComeBackJobId,
                            pdPaymentTypeId: item.job.pdPaymentTypeId,
                            pdJobSourceId: item.job.pdJobSourceId,
                            pdJobStatusId: enums.jobStatus.NEW,
                            flatRate: 0,
                            labourCharge: item.job.labourCharge,
                            subTotal: item.job.labourCharge,
                            updatedDateTime: new Date(),
                            servicePackageId: item.job.servicePackageId
                        };

                        if (appointmentJob && appointmentJobId) {
                            db.AppointmentJob.update(jobItem, {
                                where: {
                                    id: appointmentJobId
                                }
                            });
                        } else {
                            db.AppointmentJob.build(jobItem).save(); // case add new
                        }
                    });

                    //check case delete
                    if (listJobDeleted) {
                        listJobDeleted.forEach(id => {
                            var appointmentJob = listAppointmentJob.filter(e => e.id === id);
                            if (appointmentJob) {
                                db.AppointmentJob.update({
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
            }

            if (listJobParts) {
                var listAppointmentPart = await db.AppointmentPart.findAll({
                    where: {
                        appointmentId: result.id
                    }
                });
                if (listAppointmentPart !== null && listAppointmentPart) {
                    listJobParts.forEach(item => {
                        var appointmentPartId = item.part.appointmentPartId;
                        var appointmentPart = listAppointmentPart.filter(e => e.id === appointmentPartId);

                        var partItem = {};

                        var quantity = (item.part && item.part.quantity) ? item.part.quantity : 0;
                        var unitPrice = (item.part && item.part.unitPrice) ? item.part.unitPrice : 0;

                        partItem.appointmentId = result.id;
                        partItem.jobId = item.jobId;
                        partItem.partId = item.part.partId;
                        partItem.pdPartSourceId = item.part.pdPartSourceId;
                        partItem.pdPaymentTypeId = item.part.pdPaymentTypeId;
                        partItem.requestQty = quantity;
                        partItem.unitPrice = unitPrice;
                        partItem.subTotal = quantity * unitPrice;
                        partItem.flatRate = 0;
                        partItem.servicePackageId = item.servicePackageId;

                        if (appointmentPart && appointmentPartId) {
                            db.AppointmentPart.update(partItem, {
                                where: {
                                    id: appointmentPartId
                                }
                            });
                        } else {
                            db.AppointmentPart.build(partItem).save(); // case add new
                        }
                    });

                    //check case delete
                    if (listPartDeleted) {
                        listPartDeleted.forEach(id => {
                            var appointmentPart = listAppointmentPart.filter(e => e.id === id);
                            if (appointmentPart) {
                                db.AppointmentPart.update({
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
            }
            return Promise.resolve({
                success: true,
                message: messageConstants.APPOINMENT_UPDATE_SUCCESS
            });
        }
    }

}

/*
Get by Id
*/
exports.getById = function (id) {
    return db.Appointment.find({
        where: {
            id: id
        }
    });
}

/*
 */
exports.getFullAppointmentById = function (id) {
    return db.Appointment.find({
        where: {
            id: id
        },
        include: [{
            model: db.AppointmentJob,
            include: [{
                model: db.JobMaster,
                attributes: ['id', 'code', 'description'],
            }]
        },
        {
            model: db.TimeSlotDetail,
            attributes: ['id', 'startTime'],
        },
        {
            model: db.AppointmentPart,
            include: [{
                model: db.PartMaster,
                attributes: ['id', 'code', 'description']
            }]
        },
        {
            model: db.VehicleCustomer,
            include: [{
                model: db.Vehicle,
                attributes: ['id', 'vehicleVariantId', 'engineNo', 'chassisNo', 'vinNo'],
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
        }
        ]
    });
}

exports.delete = function (id) {
    var task = this.getById(id)
        .then(result => {
            if (result) {
                return result.updateAttributes({
                    isDeleted: 1,
                    updatedDateTime: Date()
                });
            }
        })
    return task;
}

exports.generateNo = function () {
    var task = db.Appointment.max('id').then(id => {
        var temp = !Number.isNaN(id) ? (id + 1) : 1;
        var no = "00000000" + temp;
        return "APT" + no.substr(no.length - 8);
    })
    return task;
}

exports.getTimeSlotDetailUses = function (data) {
    if (!data.workShopId && parseInt(data.workShopId, 10) == 0)
        data.workShopId = null;

    return db.Appointment.findAll({
        where: {
            isDeleted: 0,
            timeSlotDate: {
                $gte: data.startDate,
                $lte: data.endDate
            },
            workShopId: data.workShopId
        },
        group: ['timeSlotDate', 'timeSlotDetailId'],
        attributes: ['timeSlotDate', 'timeSlotDetailId', [db.sequelize.fn('count', db.sequelize.col('timeSlotDetailId')), 'countTimeDetailUse']]
    });
}

/**
 * Get VehicleCustomerId by id
 */
exports.findByNo = function (data) {
    var idArray = JSON.parse(data.ids);
    return db.Appointment.findAll({
        attributes: ['id', 'vehicleCustomerId', 'createdDateTime'],
        where: {
            vehicleCustomerId: {
                $in: [idArray]
            }
        },
    });
}

/**
 * Get appointment by timeslot
 */
exports.getByTimeSlot = function (data) {
    var timeSlotUseArray = JSON.parse(data.timeSlotUseIds);

    let attributes = ['id', 'appointmentNo', 'statusId', 'createdDateTime', 'vehicleCustomerId', 'timeSlotUseId', 'serviceAdvisorId'];
    return db.Appointment.findAll({
        attributes: attributes,
        where: {
            timeSlotUseId: {
                $in: [timeSlotUseArray]
            }
        },
    });
}

exports.validate = function (appointment) {
    if (appointment) {
        var listJob = appointment.jobs;
        var listJobPart = appointment.jobParts;

        if (listJob) {
            if (listJob.filter(e => e.job.pdComeBackJobId == null).length > 0) {
                return {
                    success: false,
                    message: messageConstants.APPOINMENT_COMEBACK_JOB_REQUIRED
                };
            }
            if (listJob.filter(e => e.job.pdPaymentTypeId == null).length > 0) {
                return {
                    success: false,
                    message: messageConstants.APPOINMENT_PAYMENT_TYPE_REQUIRED
                };
            }
            if (listJob.filter(e => e.job.pdJobSourceId == null).length > 0) {
                return {
                    success: false,
                    message: messageConstants.APPOINMENT_JOB_SOURCE_REQUIRED
                };
            }
        }

        if (listJobPart) {
            if (listJobPart.filter(e => e.part.pdPartSourceId == null).length > 0) {
                return {
                    success: false,
                    message: messageConstants.APPOINMENT_PART_SOURCE_REQUIRED
                };
            }
            if (listJobPart.filter(e => e.part.pdPaymentTypeId == null).length > 0) {
                return {
                    success: false,
                    message: messageConstants.APPOINMENT_PAYMENT_TYPE_REQUIRED
                };
            }
        }

        return {
            success: true
        };
    }

    return {
        success: false,
        message: messageConstants.APPOINMENT_PARAM_REQUIRED
    };
}