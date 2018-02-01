'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
var querystring = require('querystring');

exports.getTimeSlots = function (workShopId) {
    if(!workShopId || parseInt(workShopId, 10) == 0)
        workShopId = null;

    return db.TimeSlotMaster.findAll({
        where: {
            isDeleted: 0,
            workShopId: workShopId
        },
        include: [{
            model: db.TimeSlotDetail,
            require: true
        }]
    }).then(timeSlotMasters => {
        timeSlotMasters.forEach(el => {
            var timeSlotDetails = el.dataValues.TimeSlotDetails;
            if (timeSlotDetails && timeSlotDetails.length > 0) {
                var maxVersion = Math.max.apply(this, timeSlotDetails.map(d => d.version));
                el.dataValues.TimeSlotDetails = timeSlotDetails.filter(d => d.version == maxVersion);
            }
        });
        return timeSlotMasters;
    });
}

exports.getByTimeSlotDetailId = function (timeSlotUseId) {
    return db.TimeSlotMaster.find({
        include: [{
            model: db.TimeSlotUse,
            where: {
                id: timeSlotUseId
            },
            required: true
        }]
    });
}

exports.getTimeSlotDetailById = function (id) {
    return db.TimeSlotDetail.find({
        where: {
            id: id
        }
    });
}

/**
 * Get TimeStart by id
 */
exports.findTimeStart = function (data) {
    var idArray = JSON.parse(data.ids);
    return db.TimeSlotDetail.findAll({
        attributes: ['id', 'timeSlotId', 'createdDateTime', 'startTime'],
        where: {
            id: {
                $in: [idArray]
            }
        }
    });
}

/**
 * Get Time slot special day
 */
exports.getAllTimeSlotSpecialDay = function (searchViewModel) {
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

    return db.TimeSlotSpecialDay.findAndCountAll({
        attributes: ['id', 'description', 'specialDay', 'pdTimeSlotSpecialDayTypeId'],
        where: filters, order: orderby, offset: skip, limit: limit
        , include: [{
            attributes: ['id', 'name', 'status'],
            model: db.PDTimeSlotSpecialDayType
        }]
    }, { raw: true });
}

/**
 * Create Time Slot Special Day
 */
exports.createTimeSlotSpecialDay = function (obj, res) {
    obj.isDeleted = 0;
    obj.createdDateTime = Date();
    obj.updatedDateTime = Date();

    return db.TimeSlotSpecialDay.build(obj).save();
}

/**
 * find all Time Slot master
 */
exports.findAllTimeSlotMaster = function () {
    return db.TimeSlotMaster.findAndCountAll({
        attributes: ['id', 'name', 'startTime', 'endTime', 'breakStartTime', 'breakEndTime', 'baysPerSlot', 'pdTimeSlotIntervalId', 'description']
    })
}

exports.update = function (timeSlot) {
    timeSlot.forEach(element => {

        var objTimeSlot = db.TimeSlotMaster.find({
            where: {
                id: element.id
            }
        })

        objTimeSlot.then(result => {
            if (result) {
                element.updatedDateTime = Date();
                result.updateAttributes(element);
            }
        })
    })
    return Promise.resolve(true);
}

exports.updateTimeSlotDetail = function (timeSlot) {
    timeSlot.forEach(element => {
        
        var objTimeSlot = db.TimeSlotDetail.findAll({
            attributes: ['version'],
            where: {
                timeSlotId: element.id
            },
            group: 'version'
        })

        .then(result => {
            
            var i = result[0].version + 1;

            db.TimeSlotDetail.update({
            version: i,
        }, {
                where: {
                    timeSlotId: element.id
                }
            });

        })

    })


    return Promise.resolve(true);
}

exports.getTimeSlotSpecialDaysByDateRange = function (dateRange) {
    return db.TimeSlotSpecialDay.findAll({
        where: {
            isDeleted: 0,
            specialDay: {
                $gte: dateRange.startDate,
                $lte: dateRange.endDate
            }
        }
    });
}

exports.checkSpecialDateByDate = function (objDate) {
    return db.TimeSlotSpecialDay.find({
        where: {
            isDeleted: 0,
            specialDay: {
                $gte: objDate
            }
        },
        attributes: ['id', 'pdTimeSlotSpecialDayTypeId']
    });
}

exports.getSpecialNameById = function (timeSlotSpecialDayTypeId) {
    return db.PDTimeSlotSpecialDayType.find({
        where: {
            isDeleted: 0,
            id: timeSlotSpecialDayTypeId
        }, 
        attributes: ['name']
    });
}

exports.getTimeSlotByDate = function (name) {
    let includeTimeSlotDetail = [
        { 
            model: db.TimeSlotDetail, 
            attributes: ['id','startTime', 'endTime'],
            where: {
                isDeleted: 0
            }
        }
    ];
    
    return db.TimeSlotMaster.find({
        where: {
            isDeleted: 0,
            name: name,
            status: 1
        }, 
        attributes: ['id','startTime', 'endTime', 'breakStartTime', 'breakEndTime'],
        include: includeTimeSlotDetail
    });
}

