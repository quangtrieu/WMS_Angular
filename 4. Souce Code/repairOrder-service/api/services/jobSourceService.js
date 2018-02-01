'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');

/**
 * Returns a list of PartSource
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.getAllJobSource = () => {
    let orderby = 'id DESC';

    let filters = {};
    filters.$and = [{ isDeleted: 0 }];

    return db.PDJobSource.findAll({
        where: filters,
        order: orderby
    });
}
