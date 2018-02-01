'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');

/**
 * Returns a list of vehicleMake
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.getAllJobType = () => {
    let orderby = 'id DESC';

    let filters = {};
    filters.$and = [{ isDeleted: 0 }];

    return db.PDJobType.findAll({
        where: filters,
        order: orderby
    });
}
