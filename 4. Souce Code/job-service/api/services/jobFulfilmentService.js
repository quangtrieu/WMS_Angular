'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
const utils = require('../../commons/utils');
var logUtil = require('../../../tceas-utils/utils/log');
var enums = require('../../../tceas-utils/constant/enums');

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

    let orderby = 'id DESC';
    return db.JobFulfilment.findAndCountAll({
        where: filters,
        order: orderby,
        offset: skip,
        limit: limit,
        row: true,
        include: [{
            model: db.RepairOrderMaster,
            attributes: ['id', 'vehicleCustomerId', 'code', 'createdDateTime'],
            include: [{
                    model: db.VehicleCustomer,
                    attributes: ['registrationNo'],
                    where: {
                        isOwner: 1
                    },
                    include: [{
                        model: db.Vehicle,
                        attributes: ['vehicleVariantId'],
                        include: [{
                            model: db.VehicleVariant,
                            attributes: ['code', 'description']
                        }]
                    }]
                },
                {
                    model: db.RepairOrderJob,
                    attributes: ['jobId'],
                    include: [{
                        model: db.JobMaster,
                        attributes: ['id', 'code', 'description']
                    }]
                }
            ]
        }]
    });
}

exports.getById = function (id) {
    return db.JobFulfilment.find({
        where: {
            id: id
        },
        include: [{
                model: db.RepairOrderMaster,
                attributes: ['id', 'vehicleCustomerId', 'code', 'expectedDeliveryDateTime', 'createdDateTime'],
                include: [{
                    model: db.VehicleCustomer,
                    attributes: ['registrationNo'],
                    where: {
                        isOwner: 1
                    },
                    include: [{
                        model: db.Customer,
                        attributes: ['id', 'code', 'name']
                    }]
                }]
            },
            {
                model: db.Bay,
                attributes: ['id', 'code', 'description']
            },
            {
                model: db.ServiceAdvisor,
                attributes: ['id', 'name']
            }
        ]
    }).then(result => {
        // Build Job Fulfilment Items
        return this.getRepairOrderJobs(result.RepairOrderMaster.id).then(repairOrderJobs => {
            var jobFulfilmentItems = [];
            repairOrderJobs.forEach(repairOrderJob => {
                var jobFulfilmentItem = {};
                if (!repairOrderJob.JobFulfilmentItem && repairOrderJob.JobMaster) {
                    jobFulfilmentItem.id = 0;
                    jobFulfilmentItem.jobFulfilmentId = result.id;
                    jobFulfilmentItem.repairOrderJobId = repairOrderJob.id;
                    jobFulfilmentItem.bayId = 0;
                    jobFulfilmentItem.estimatedStartTime = null;
                    jobFulfilmentItem.estimatedEndTime = null;
                    jobFulfilmentItem.jobFulfilmentItemStatusId = 1; // NEW
                    jobFulfilmentItem.JobMaster = repairOrderJob.JobMaster;
                    // Add default JobTrackings
                    jobFulfilmentItem.JobTrackings = [];
                    jobFulfilmentItem.JobTrackings.push({
                        id: 0,
                        jobFulfilmentItemId: jobFulfilmentItem.jobFulfilmentId,
                        startTime: result.RepairOrderMaster.createdDateTime,
                        endTime: null,
                        jobTrackingStatusId: 1 // NEW
                    })
                    repairOrderJob.JobFulfilmentItem = jobFulfilmentItem;

                } else if (repairOrderJob.JobFulfilmentItem) {
                    repairOrderJob.JobFulfilmentItem.dataValues.JobMaster = repairOrderJob.JobMaster;
                }

                jobFulfilmentItems.push(repairOrderJob.JobFulfilmentItem);
            });
            result.dataValues.JobFulfilmentItems = jobFulfilmentItems;
            return result;
        });
    });
}

exports.getRepairOrderJobs = function (repairOrderId, jobFulfilmentId) {
    return db.RepairOrderJob.findAll({
        attributes: ['id'],
        where: {
            repairOrderId: repairOrderId
        },
        include: [{
                model: db.JobFulfilmentItem,
                include: [{
                        model: db.JobAssignedTechnician,
                        include: [{
                            model: db.Employee,
                            attributes: ['id', 'code', 'name']
                        }]
                    },
                    {
                        model: db.JobTracking
                    }
                ]
            },
            {
                model: db.JobMaster,
                attributes: ['id', 'code', 'description']
            }
        ]
    })
}

exports.update = function (jobFulfilment) {
    return db.JobFulfilment.find({
            where: {
                id: jobFulfilment.id
            }
        })
        .then(result => { // Update JobFulfilment
            jobFulfilment.jobFulfilmentStatusId = jobFulfilment.jobFulfilmentStatusId;
            jobFulfilment.updatedDateTime = Date();
            return result.updateAttributes(jobFulfilment).then(() => {
                return jobFulfilment;
            });
        })
        .then(result => { // Update JobFulfilmentItems
            return this.updateJobFulfilmentItems(result);
        })
        .then(jobFulfilmentItems => { // Update JobTracking and JobAssignedTechnician
            return this.updateTechnicianAndJobTrackings(jobFulfilment.repairOrderId, jobFulfilmentItems);
        })
        .then(jobFulfilmentItems => { // Update jBCP
            return this.updateJBCP(jobFulfilment);
        })
        .then(() => {
            return jobFulfilment;
        })
}

exports.updateJobFulfilmentItems = function (jobFulfilment) {
    var jobFulfilmentItems = jobFulfilment.jobFulfilmentItems;
    if (jobFulfilmentItems && jobFulfilmentItems.length > 0) {
        var actions = [];
        for (var i = 0; i < jobFulfilmentItems.length; i++) {
            var action = {};
            var item = jobFulfilmentItems[i];
            if (item.id == null || item.id <= 0) { // Create New
                var jobFulfilmentItem = {
                    jobFulfilmentId: jobFulfilment.id,
                    estimatedStartTime: item.estimatedStartTime,
                    estimatedEndTime: item.estimatedEndTime,
                    repairOrderJobId: item.repairOrderJobId,
                    isDeleted: 0,
                    createdDateTime: Date(),
                    updatedDateTime: Date(),
                    jobFulfilmentItemStatusId: item.jobFulfilmentItemStatusId,
                    jobTrackings: item.jobTrackings,
                    jobAssignedTechnicians: item.jobAssignedTechnicians
                }
                if (item.bayId >0 )
                    jobFulfilmentItem.bayId = item.bayId;
                action = db.JobFulfilmentItem.build(jobFulfilmentItem).save();
            } else { // Update
                var jobFulfilmentItem = {
                    jobFulfilmentId: jobFulfilment.id,
                    estimatedStartTime: item.estimatedStartTime,
                    estimatedEndTime: item.estimatedEndTime,
                    repairOrderJobId: item.repairOrderJobId,
                    isDeleted: 0,
                    updatedDateTime: Date(),
                    jobFulfilmentItemStatusId: item.jobFulfilmentItemStatusId,
                    jobTrackings: item.jobTrackings,
                    jobAssignedTechnicians: item.jobAssignedTechnicians
                }
                if (item.bayId> 0)
                    jobFulfilmentItem.bayId = item.bayId;
                action = db.JobFulfilmentItem.update(jobFulfilmentItem, {
                    where: {
                        id: item.id
                    }
                });
            }
            actions.push(action);
        }

        return Promise.all(actions).then((results) => {
            for (var i = 0; i < jobFulfilmentItems.length; i++) { // Update id for jobFulfilmentItem
                if (jobFulfilmentItems[i].id > 0) continue;

                jobFulfilmentItems[i].id = results[i].id;
            }
            return jobFulfilmentItems;
        });
    }
}

exports.updateTechnicianAndJobTrackings = function (repairOrderId, jobFulfilmentItems) {
    var actions = [];
    jobFulfilmentItems.forEach(item => {
        var jobTrackings = item.jobTrackings;
        if (jobTrackings && jobTrackings.length > 0) {
            jobTrackings.forEach(jobTracking => {
                var action = {};
                if (jobTracking.id == null || jobTracking.id <= 0) { // Create New
                    action = db.JobTracking.build({
                        jobFulfilmentItemId: item.id,
                        startTime: jobTracking.startTime,
                        endTime: jobTracking.endTime,
                        jobTrackingStatusId: jobTracking.jobTrackingStatusId,
                        isDeleted: 0,
                        createdDateTime: Date(),
                        updatedDateTime: Date(),
                    }).save();

                } else { // Update
                    action = db.JobTracking.update({
                        startTime: jobTracking.startTime,
                        endTime: jobTracking.endTime,
                        jobTrackingStatusId: jobTracking.jobTrackingStatusId,
                        isDeleted: 0,
                        updatedDateTime: Date(),
                    }, {
                        where: {
                            id: jobTracking.id
                        }
                    });
                }
                actions.push(action);
            })
        }
        var jobAssignedTechnicians = item.jobAssignedTechnicians;
        if (jobAssignedTechnicians && jobAssignedTechnicians.length > 0) {
            jobAssignedTechnicians.forEach(jobAssignedTechnician => {
                var action = {};
                if ((jobAssignedTechnician.id == null || jobAssignedTechnician.id <= 0) && !jobAssignedTechnician.isDeleted) { // Create New
                    action = db.JobAssignedTechnician.build({
                        jobFulfilmentItemId: item.id,
                        employeeId: jobAssignedTechnician.employeeId,
                        repairOrderId: repairOrderId,
                        isDeleted: 0,
                        createdDateTime: Date(),
                        updatedDateTime: Date(),
                    }).save();

                } else { // Update
                    action = db.JobAssignedTechnician.update({
                        employeeId: jobAssignedTechnician.employeeId,
                        isDeleted: jobAssignedTechnician.isDeleted,
                        repairOrderId: repairOrderId,
                        updatedDateTime: Date()
                    }, {
                        where: {
                            id: jobAssignedTechnician.id
                        }
                    });
                }
                actions.push(action);
            })
        }

    })

    return Promise.all(actions).then((results) => {
        return jobFulfilmentItems;
    });
}

exports.updateJBCP = function (jobFulfilment) {
    var jobFulfilmentItems = jobFulfilment.jobFulfilmentItems;
    return db.JPCB.findAll({
            where: {
                repairOrderId: jobFulfilment.repairOrderId
            }
        })
        .then(result => {
            var actions = [];
            var bayIds = utils.uniqueValues(jobFulfilmentItems.map(item => item.bayId));
            for (var i = 0; i < bayIds.length; i++) {
                var bayId = bayIds[i];
                var action = {};
                if (!bayId) continue;
                // Caculate StartTime, EndTime
                var jobFulfilmentItemsInBay = jobFulfilmentItems.filter(item => item.bayId == bayId);
                var startTime = Math.min(...jobFulfilmentItemsInBay.map(item => Math.min(...item.jobTrackings.filter(d => d.startTime).map(d => new Date(d.startTime).getTime()))));
                // Note: EndTime of Complete is JobTracking.StartTime
                var endTime = Math.max(...jobFulfilmentItemsInBay.map(item => Math.max(...item.jobTrackings.filter(d => d.startTime && d.jobTrackingStatusId == enums.jobTrackingStatus.COMPLETE).map(d => new Date(d.startTime).getTime()))));
                if (!startTime || startTime == 'Infinity') { // No found startTime
                    startTime = Math.min(...jobFulfilmentItemsInBay.filter(item => item.estimatedStartTime).map(item => new Date(item.estimatedStartTime).getTime()));
                }
                if (!endTime || endTime == '-Infinity') { // No found endTime
                    endTime = Math.max(...jobFulfilmentItemsInBay.filter(item => item.estimatedEndTime).map(item => new Date(item.estimatedEndTime).getTime()));
                }
                if (!startTime || startTime == 'Infinity' || !endTime || endTime == '-Infinity') {
                    action = db.JPCB.destroy({
                        where: {
                            repairOrderId: jobFulfilment.repairOrderId,
                            bayId: bayId
                        }
                    })
                    actions.push(action);
                    continue;
                }
                // Caclate jPCBStatusId
                var jPCBStatusId = enums.jPCBStatus.PLANNED;
                var jobTrackings = jobFulfilmentItemsInBay.map(item => this.getLastJobTracking(item));
                var jobTrackingStatusIds = jobTrackings.filter(item => item != null).map(item => item.jobTrackingStatusId); // ingore NULL
                if (jobTrackingStatusIds && jobTrackingStatusIds.length > 0) {
                    if (jobTrackingStatusIds.filter(s => s == enums.jobTrackingStatus.START || s == enums.jobTrackingStatus.PAUSE).length > 0) {
                        jPCBStatusId = enums.jPCBStatus.INPROGRESS;
                    } else if (jobTrackingStatusIds.filter(s => s == enums.jobTrackingStatus.COMPLETE).length == jobTrackingStatusIds.length)
                        jPCBStatusId = enums.jPCBStatus.COMPLETED;
                }

                var existed = (result != null && result.filter(r => r.bayId == bayId).length > 0);
                if (!existed) { // Create
                    var jBCP = {
                        bayId: bayId,
                        repairOrderId: jobFulfilment.repairOrderId,
                        startTime: new Date(startTime),
                        endTime: new Date(endTime),
                        jPCBStatusId: jPCBStatusId,
                        isDeleted: 0,
                        createdDateTime: Date(),
                        updatedDateTime: Date()
                    };
                    if (jobFulfilment.serviceAdvisorId > 0)
                        jBCP.serviceAdvisorId = jobFulfilment.serviceAdvisorId;

                    action = db.JPCB.build(jBCP).save();
                } else { // Update
                    var jBCP = {
                        bayId: bayId,
                        repairOrderId: jobFulfilment.repairOrderId,
                        startTime: new Date(startTime),
                        endTime: new Date(endTime),
                        jPCBStatusId: jPCBStatusId,
                        updatedDateTime: Date()
                    };
                    if (jobFulfilment.serviceAdvisorId > 0)
                        jBCP.serviceAdvisorId = jobFulfilment.serviceAdvisorId;

                    action = db.JPCB.update(jBCP, {
                        where: {
                            repairOrderId: jobFulfilment.repairOrderId,
                            bayId: bayId
                        }
                    });
                }
                actions.push(action);
            }
            return Promise.all(actions);
        })
}

exports.getLastJobTracking = function (jobFulfilmentItem) {
    if (!jobFulfilmentItem.jobTrackings || jobFulfilmentItem.jobTrackings.length == 0)
        return null;

    // Sort by EndTime DESC
    jobFulfilmentItem.jobTrackings.sort((a, b) => {
        var v1 = a.endTime ? new Date(a.endTime).getTime() : 0;
        var v2 = b.endTime ? new Date(b.endTime).getTime() : 0;
        return v2 - v1;
    });

    return jobFulfilmentItem.jobTrackings[jobFulfilmentItem.jobTrackings.length - 1];
}

exports.getAssignTechnicians = function (searchViewModel) {
    // TODO: Paging and Filter
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

    return db.Employee.findAll({
            where: filters,
            attributes: ['id', 'name']
        })
        .then(employees => {
            var employeeIds = employees.map(e => e.id);
            return db.JobAssignedTechnician.findAll({
                where: {
                    employeeId: {
                        $in: employeeIds
                    },
                    isDeleted: 0
                },
                include: [{
                    model: db.RepairOrderMaster,
                    attributes: ['id', 'code']
                }]
            }).then(jobAssignedTechnicians => {
                var assignTechnicians = [];
                employees.forEach(e => {
                    var temps = jobAssignedTechnicians.filter(j => j.employeeId == e.id);
                    var existingTasks = utils.uniqueValues(temps.map(t => t.RepairOrderMaster)).map(r => {
                        if (r != null)
                            return {
                                repairOrderId: r.id,
                                repairOrderCode: r.code
                            }
                        return null;
                    }).filter(i => i != null);

                    assignTechnicians.push({
                        id: e.id,
                        technicianName: e.name,
                        existingTasks: existingTasks
                    });
                })
                return assignTechnicians;
            })
        })
}

exports.initJobFulfilment = function (jobFulfilment) {
    return db.JobFulfilment.build({
        repairOrderId: jobFulfilment.repairOrderId,
        serviceAdvisorId: jobFulfilment.serviceAdvisorId,
        isDeleted: 0,
        jobFulfilmentStatusId: jobFulfilment.jobFulfilmentStatusId,
        createdDateTime: Date(),
        updatedDateTime: Date()
    }).save();
}