'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');

/**
 * Returns a list of PDPaymentType
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.getAllPaymentType = () => {
    let orderby = 'id DESC';

    let filters = {};
    filters.$and = [{ isDeleted: 0 }];

    return db.PDPaymentType.findAll({
        where: filters,
        order: orderby
    });
}
