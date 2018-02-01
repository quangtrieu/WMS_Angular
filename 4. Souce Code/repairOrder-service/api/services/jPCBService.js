'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
var enums = require('../../../tceas-utils/constant/enums');
var utils = require('../../../tceas-utils/utils/utils');

exports.getAllByDate = function (date) {
    let dateRange = {};
    dateRange.startTime = new Date(date);
    dateRange.endTime = utils.addDays(dateRange.startTime, 1);

    let includeRepairOrder = [{
        model: db.RepairOrderMaster,
        attributes: ['id', 'vehicleCustomerId', 'code' ,'isCustomerWaiting'],
        include: [{
            model: db.VehicleCustomer,
            attributes: ['registrationNo'],
            where: {
                isOwner: 1
            }
        }]
    }];

    let orderby = 'startTime ASC, endTime ASC';

    return db.JPCB.findAll({
        where: {
            startTime: {
                $gte: dateRange.startTime
            },
            endTime: {
                $lt: dateRange.endTime
            },
            isDeleted: 0
        },
        include: includeRepairOrder,
        order: orderby
    });

}

exports.createSuggestedBay = function (data) {
    return db.JobFulfilment.update({
        suggestedBayId: data.bayId,
        updatedDateTime: Date()
    }, {
        where: {
            id: data.jobFulfilmentId
        }
    }).then(result => { // Update jobFulfilmentItem
        var jobFulfilmentItem = {
            jobFulfilmentId: data.jobFulfilmentId,
            estimatedStartTime: data.expectedStartDate,
            estimatedEndTime: data.expectedEndDate,
            bayId: data.bayId,
            repairOrderJobId: data.repairOrderJobId,
            isDeleted: 0,
            createdDateTime: Date(),
            updatedDateTime: Date(),
            jobFulfilmentItemStatusId: 1
        }
        return db.JobFulfilmentItem.build(jobFulfilmentItem).save();
    }).then(jobFulfilmentItem => { // Update jobFulfilmentItem
        return db.BayEmployee.find({
            where: {
                bayId: data.bayId,
                isDeleted: 0
            }
        }).then(bayEmployee => {
            if (bayEmployee) {
                return db.JobAssignedTechnician.build({
                    jobFulfilmentItemId: jobFulfilmentItem.id,
                    employeeId: bayEmployee.employeeId,
                    repairOrderId: data.repairOrderId,
                    isDeleted: 0,
                    createdDateTime: Date(),
                    updatedDateTime: Date(),
                }).save();
            }
        })
    }).then(result => {  // Update jBCP
        var jBCP = {
            bayId: data.bayId,
            repairOrderId: data.repairOrderId,
            startTime: data.expectedStartDate,
            endTime: data.expectedEndDate,
            jPCBStatusId: enums.jPCBStatus.PLANNED,
            isDeleted: 0,
            createdDateTime: Date(),
            updatedDateTime: Date()
        };
        if (data.serviceAdvisorId > 0)
            jBCP.serviceAdvisorId = data.serviceAdvisorId;

        return db.JPCB.build(jBCP).save();
    });
}