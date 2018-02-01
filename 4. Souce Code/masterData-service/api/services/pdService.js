'use strict';
const db = require('../entities');
const Paginator = require('../../commons/paginator');

/**
 * Returns a list of parameter
 * @param   {req}   
 * @returns {Promise} resolved parameter if found, otherwise resolves undefined
 */
exports.getData = function (data) {

    var filters = {};
    filters.$and = [{ status: 1, isDeleted: 0 }];

    switch(data) {
         case "country": 
          return db.PDCountry.findAll({
            where: filters,
            attributes: ['id', 'code', 'description']
          });
          break;

         case "idType": 
          return db.PDIdType.findAll({
            where: filters,
            attributes: ['id', 'code', 'description']
          });
          break;
        
        case "race": 
          return db.PDRace.findAll({
            where: filters,
            attributes: ['id', 'code', 'description']
          });
          break;

        case "salutation": 
          return db.PDSalutation.findAll({
            where: filters,
            attributes: ['id', 'code', 'description']
          });
          break;

        case "occupation": 
          return db.PDOccupation.findAll({
            where: filters,
            attributes: ['id', 'code', 'description']
          });
          break;

        case "employeeStatus": 
          return db.PDEmployeeStatus.findAll({
            where: filters,
            attributes: ['id', 'code', 'description']
          });
          break;
    }
}