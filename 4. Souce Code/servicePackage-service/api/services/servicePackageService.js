'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
const messageConstants = require('../constant/messageConstants');
const util = require('util');

/**
 * Returns a list of servicePackage by vehicleVariantId
 * @param   {vehicleVariantId}   number - The workShopId to find
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.getAllByVariantIdAndMilleage = (vehicleVariantId, packageTypeId, currentMilleage) => {
    let orderby = 'id DESC';

    let filters = {};
    filters.$and = [{ isDeleted: 0 }];
    let queryInclude = [];
    // filters.$and.push({ effectiveDateFrom: { $gte: new Date() } });
    // filters.$and.push({ effectiveDateTo: { $lt: new Date() } });

    if (vehicleVariantId && vehicleVariantId != "null") {

        queryInclude.push({
            model: db.ServicePackageVariant, where: { vehicleVariantId: { $eq: parseInt(vehicleVariantId) } },
            include: [{
                model: db.ServicePackageJob, attributes: ['id', 'servicePackageVariantId', 'labourCharge'],
                include: [{ model: db.JobMaster }, {
                    model: db.ServicePackagePart, attributes: ['id', 'servicePackageJobId', 'partId', 'quantity', 'unitPrice'],
                    include: [{ model: db.PartMaster }]
                }],
                required: true
            }],
            required: true
        });
    }

    if (packageTypeId && packageTypeId != "null") {
        queryInclude.push({
            model: db.PDPackageType, where: { id: { $eq: parseInt(packageTypeId) } }
        });
    }

    if (currentMilleage && currentMilleage != "null") {
        queryInclude.push({
            model: db.ServicePackageVersion, where: { milleage: { $gte: parseInt(currentMilleage) } }
        });
    }

    return db.ServicePackageMaster.findAll({ where: filters, include: queryInclude, order: orderby, row: true });
}


/**
 * Returns a list of PDPackageType
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.getAllPackageTypes = () => {
    let orderby = 'id DESC';

    let filters = {};
    filters.$and = [{ isDeleted: 0 }];

    return db.PDPackageType.findAll({
        where: filters,
        order: orderby
    });
}


exports.getJobPartById = (id) => {
    let orderby = 'id DESC';

    let filters = {};
    filters.$and = [{ isDeleted: 0 }];

    return db.ServicePackageMaster.find({ where: { id: id } });
}

exports.parseExcel = async (pathFile)=> {
    var XLSX = require('xlsx');
    var workbook = XLSX.readFile(pathFile);
    var sheet_name_list = workbook.SheetNames;
    var listServicePackage = [];
    var list = [];
    var index = 1;
    sheet_name_list.forEach(function (y) {
        var worksheet = workbook.Sheets[y];
        var headers = {};
        var data = [];
        for (var z in worksheet) {
            if (z[0] === '!') continue;
            //parse out the column, row, and value
            var tt = 0;
            for (var i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            };
            var col = z.substring(0, 1);
            var row = z.substring(1);
            var value = worksheet[z].v;

            //store header names
            if (row == 1) {
                headers[col] = value;
                continue;
            }

            if (!data[row]) data[row] = {};
            data[row][headers[col]] = value;
            if (row != index) {
                listServicePackage.push(data[row]);
                index = row;
            }
        }
    });
    
    listServicePackage.forEach(function (element) {
        element.workShopId = 1;
        element.isDeleted = 0;
        element.createdDateTime = Date();
        element.updatedDateTime = Date();
        element.createdBy = 'TC';
        list.push(element);
    });
    return this.createServicePackageMaster(list,0,0,0);
}

exports.createServicePackageMaster = function(list,index,ok,error)
{
    if (list.length == index ){
        var response = {success: true, indexsuccess: ok, indexerror: error };
        return Promise.resolve(response);
    }
    return db.ServicePackageMaster.build(list[index]).save().then(result => {
        if (result) {
            return this.createServicePackageMaster(list,index + 1,ok + 1,error);
        }
    }).catch(err => {
        return this.createServicePackageMaster(list,index + 1,ok,error + 1);
    });
}


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
    var filterStatus = {};
    filterStatus.$and = [{
        isDeleted: 0
    }];
    
    var searchModel = searchViewModel.data;
    var sortColumn = searchViewModel.sortColumn;

    if (searchModel != null) {
        if (searchModel.code) {
            filters.$and.push({ code: { $like: searchModel.code + '%' } });
        }

        if (searchModel.description) {
            filters.$and.push({ description: { $like: '%' + searchModel.description + '%' } });
        }

        if (searchModel.status) {
            filters.$and.push({ code: { $like: '%' + searchModel.status + '%' } });
        }

        if (searchModel.type) {
            filterStatus.$and.push({ code: { $like: '%' + searchModel.type + '%' } });
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

    let includeInfomation = [
        {
            model: db.PDPackageType,
            attributes: ['code'],
            where: filterStatus
        }
    ];
    return db.ServicePackageMaster.findAndCountAll({
        where: filters,
        attributes: ['id', 'code', 'description','createdDateTime', 'createdBy'],
        include: includeInfomation,
        order: orderby,
        offset: skip,
        limit: limit,
        row: true
    });
}

