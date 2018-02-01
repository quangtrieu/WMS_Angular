'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');

/**
 * Returns a list of vehicleMake
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.getAllPartSource = () => {
    let orderby = 'id DESC';

    let filters = {};
    filters.$and = [{ isDeleted: 0 }];

    return db.PDPartSource.findAll({
        where: filters,
        order: orderby
    });
}
