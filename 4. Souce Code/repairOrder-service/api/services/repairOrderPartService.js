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
    var filtersPart = {};
    filtersPart.$and = [];
    var filtersVehicleCustomer = {};
    filtersVehicleCustomer.$and = [];
    
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

        if (searchModel.estimatedTime) {
            filtersRO.$and.push({ expectedDeliveryDateTime: { $eq: searchModel.estimatedTime } })
        }

        if (searchModel.requestQty) {
            filtersPart.$and.push({ requestQty: { $eq: searchModel.requestQty } })
        }

        if (searchModel.fulfilQty) {
            filtersPart.$and.push({ requestQty: { $eq: searchModel.fulfilQty } })
        }

        // if (searchModel.latestFullfilmentNo) {
        //     filtersPart.$and.push({ latestFullfilmentNo: { $like: '%' + searchModel.latestFullfilmentNo + '%' } })
        // }

        // if (searchModel.fullfilledBy) {
        //     filtersPart.$and.push({ fullfilledBy: { $like: '%' + searchModel.fullfilledBy + '%' } })
        // }

        // if (searchModel.fullfilledDateTime) {
        //     filtersPart.$and.push({ fullfilledDateTime: { $eq: searchModel.fullfilledDateTime } })
        // }
    }

    // sorting
    let orderby = 'id DESC';
    if (sortColumn && sortColumn.columnName != null) {
        if (sortColumn.columnName && sortColumn.isAsc) {
            orderby = sortColumn.columnName + ' ASC';
        } else {
            orderby = sortColumn.columnName + ' DESC';
        }
    }

    let includeROInfomation = [
        {
            model: db.RepairOrderMaster,
            attributes: ['vehicleCustomerId', 'code', 'dateTimeIn', 'expectedDeliveryDateTime', 'latestFullfilmentNo', 'fullfilledBy', 'fullfilledDateTime'],
            where: filtersRO,
            include: [
                {
                    model: db.VehicleCustomer,
                    attributes: ['id', 'registrationNo'],
                    where: filtersVehicleCustomer,
                }
            ]
        }
    ];

    // let actions = [];     
    
    // actions.push(db.RepairOrderPart.count({where: filtersPart, distinct: true}));
    // actions.push(db.RepairOrderPart.findAll({
    //     where: filtersPart, order: orderby, offset: paginator.getOffset(), limit: paginator.getLimit(),
    //     attributes: ['repairOrderId', [db.sequelize.fn('sum', db.sequelize.col('requestQty')), 'totalRequest'], 
    //         [db.sequelize.fn('sum', db.sequelize.col('fullfillQty')), 'totalFulfill']],
    //     include: includeROInfomation, group: ['repairOrderId']
    // }))

    // return Promise.all(actions).then(results=>{
    //     var count = results[0];
    //     var rows = results[1];

    //     return {
    //         count,
    //         data: rows
    //     }
    // });

    return db.RepairOrderPart.findAndCountAll({
            where: filtersPart, order: orderby, offset: paginator.getOffset(), limit: paginator.getLimit(),
            attributes: ['repairOrderId', [db.sequelize.fn('sum', db.sequelize.col('requestQty')), 'totalRequest'], 
                [db.sequelize.fn('sum', db.sequelize.col('fullfillQty')), 'totalFulfill']],
            include: includeROInfomation, group: ['repairOrderId']
        }, {row: true})
}

/**
 * Get by id
 */
exports.getByROId = function (roId) {
    let attributesPart = [
        'id', 'partId', 'requestQty', 'fullfillQty'
    ];

    let attributesRO = [
        'id','code', 'dateTimeIn'
    ];

    let includeFulfillmentHistory = [
        {
            model: db.PartFulfillment,
            attributes: ['code', 'repairOrderPartId', 'partId', 'fulfillmentQty'],
            where: { isDeleted: 0 },
            required: false, 
            include: {
                model: db.PartMaster,
                attributes: ['code', 'description'],
                where: { isDeleted: 0 },
                required: false,
                include: {
                    model: db.PDUnitOfMeasure,
                    attributes: ['code', 'description'],
                    where: { isDeleted: 0 },
                    required: false
                }
            }
        },
        {
            model: db.PartMaster,
            attributes: ['code', 'description'],
            where: { isDeleted: 0 },
            required: false,
            include: {
                model: db.PDUnitOfMeasure,
                attributes: ['code', 'description'],
                where: { isDeleted: 0 },
                required: false
            }
        }
    ];

    let includeJobTechnicalFulfillment = [
        {
            model: db.JobAssignedTechnician,
            attributes: ['jobFulfilmentItemId'],
            where: { isDeleted: 0 },
            required: false,
            include: {
                model: db.Employee,
                attributes: ['id', 'name'],
                where: { isDeleted: 0 },
                required: false
            }
        }, 
        {
            model: db.VehicleCustomer,
            attributes: ['registrationNo'],
            where: { isOwner: 1 },
            required: false
        }
    ];

    let actions = [];     
    
    actions.push(db.RepairOrderMaster.find({where: { id: roId }, attributes: attributesRO, include: includeJobTechnicalFulfillment }));
    actions.push(db.RepairOrderPart.findAll({ where: { repairOrderId: roId }, attributes: attributesPart,  include: includeFulfillmentHistory }));

    return Promise.all(actions).then(results=>{
        var roMaster = results[0];
        var roPart = results[1];

        return {
            master: roMaster,
            part: roPart
        }
    });
}