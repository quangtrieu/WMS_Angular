'use strict';
const db = require('../entities');

/**
 * Returns a list of servicePackage by vehicleVariantId
 * @param   {vehicleVariantId}   number - The workShopId to find
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.getListEffectiveByVehicleVariantId = function (vehicleVariantId) {
    let orderby = 'id DESC';

    let filters = {};
    filters.$and = [{ isDeleted: 0 }];
    filters.$and.push({ effectiveDateFrom: { $gte: new Date() } });
    filters.$and.push({ effectiveDateTo: { $lt: new Date() } });

    if (vehicleVariantId) {
        filters.$and.push({ vehicleVariantId: { $eq: vehicleVariantId } });
    }

    return db.ServicePackageMaster.findAll({ where: filters, order: orderby, row: true });
}