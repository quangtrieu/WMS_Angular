'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');
const messageConstants = require('../constant/messageConstants');


/**
 * Returns a list of part by workshopId
 * @param   {workShopId}   number - The workShopId to find
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.getListPartByWorkShopId = function (workShopId) {
    let orderby = 'id DESC';

    let filters = {};
    filters.$and = [{ isDeleted: 0 }];

    if (workShopId) {
        filters.$and.push({ workShopId: { $eq: parseInt(workShopId) } });
    }

    return db.PartMaster.findAll({ where: filters, attributes: ['id', [db.sequelize.fn("concat", db.sequelize.col("code"), ' - ', db.sequelize.col("description")), 'display']], order: orderby, row: true });
}

exports.getListBinByWorkShopId = function (workShopId) {
    let orderby = 'id DESC';

    let filters = {};
    filters.$and = [{ isDeleted: 0 }];

    // if (workShopId) {
    //     filters.$and.push({ workshopId: { $eq: parseInt(workShopId) } });
    // }

    return db.Bin.findAll({ where: filters, attributes: ['id', [db.sequelize.fn("concat", db.sequelize.col("code"), ' - ', db.sequelize.col("description")), 'display']], order: orderby, row: true });
}
/**
 * Get part by id
 */
exports.findById = function (id) {
    return db.PartMaster.find({ where: { id: id } });
    // return db.Customer.find({ where: { id: id }, attributes: ['id', 'name', "description", "status"] });
}

exports.createStore = function (obj) {
    return db.sequelize.query('CALL AddPurchaseOrder(:partIds,:binIds,:workshopId,:reservedQtys,:createdBy,:modifiedBy,@result);', { replacements: { partIds: obj.partId, binIds: obj.binId, workshopId: obj.workshopId, reservedQtys: obj.reservedQty, createdBy: obj.createdBy, modifiedBy: obj.modifiedBy } }).then(function (response) {
        return { success: true, message: messageConstants.COMMON_CREATE_SUCCESS };
    }).error(function (err) {
        return { success: false, message: err };
    });
}

exports.parseExcel = async function (pathFile) {
    var XLSX = require('xlsx');
    var workbook = XLSX.readFile(pathFile);
    var sheet_name_list = workbook.SheetNames;
    var listServicePackage = [];
    var index = 1;
    sheet_name_list.forEach(function(y) {
        var worksheet = workbook.Sheets[y];
        var headers = {};
        var data = [];
        for(var z in worksheet) {
            if(z[0] === '!') continue;
            //parse out the column, row, and value
            var tt = 0;
            for (var i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            };
            var col = z.substring(0,1);
            var row = z.substring(1);
            var value = worksheet[z].v;
    
            //store header names
            if(row == 1) {
                headers[col] = value;
                continue;
            }
    
            if(!data[row]) data[row]={};
            data[row][headers[col]] = value;
            if (row != index){
                listServicePackage.push(data[row]);
                index = row;
            }
        }
    });
    return Promise.resolve({ success: true, message: messageConstants.COMMON_CREATE_SUCCESS });
    //var xls = require('excel');
    // await xls(pathFile, function (err, array) {
    //     if (err) return { success: false, message: err };
    //     var first = array[0].join()
    //     var headers = first.split(',');
    //     var listServicePackage = [];
    //     for (var i = 1, length = array.length; i < length; i++) {

    //         var myRow = array[i].join();
    //         var row = myRow.split(',');

    //         var data = {};
    //         for (var x = 0; x < row.length; x++) {
    //             if (headers[x] == 'Code') {
    //                 data.code = row[x];
    //             } else if (headers[x] == 'Description') {
    //                 data.description = row[x];
    //             } else if (headers[x] == 'Package Type') {
    //                 data.type = row[x];
    //             } else if (headers[x] == 'NPMP/FMS Type') {
    //                 data.npmp = row[x];
    //             }
    //         }
    //         listServicePackage.push(data);
    //     }
    //     var t = '';
    //     return Promise.resolve({ success: true, message: messageConstants.COMMON_CREATE_SUCCESS });
    // });
    // return Promise.reject();
}

exports.getAll = function (searchViewModel) {

    var searchModel = searchViewModel.data;
    var sortColumn = searchViewModel.sortColumn;
    let skip = null, limit = null, paginator = null;

    paginator = new Paginator(searchViewModel.currentPage, searchViewModel.pageSize);
    limit = paginator.getLimit();
    skip = paginator.getOffset();

    var filters = {};
    filters.$and = [{ isDeleted: 0 }];

    if (searchModel) {
        if (searchModel.grnNo) {
            filters.$and.push({ code: { $like: '%' + searchModel.grnNo + '%' } })
        }

        if (searchModel.grnDate) {
            filters.$and.push({ createdDateTime: { $eq: searchModel.grnDate } })
        }

        if (searchModel.status) {
            filters.$and.push({ status: { $eq: searchModel.status } })
        }

        if (searchModel.poNo) {
            filters.$and.push({ poNo: { $like: '%' + searchModel.poNo + '%' } })
        }

        if (searchModel.poDate) {
            filters.$and.push({ poDate: { $eq: searchModel.poDate } })
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

    return db.GoodReceiveMaster.findAndCountAll({
        where: filters,
        include: [{
            model: db.GoodReceiveItem,
            attributes: ['ReceivedQty'],
        }],
        attributes: ['id', 'code', 'poNo', 'poDate', 'status', 'createdDateTime'],
        order: orderby,
        offset: skip,
        limit: limit,
        row: true
    });
}
