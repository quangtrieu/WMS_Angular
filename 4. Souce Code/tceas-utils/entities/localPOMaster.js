"use strict";

module.exports = function (sequelize, DataTypes) {
    var LocalPOMaster = sequelize.define('LocalPOMaster', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        subletId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        repairOrderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        statusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pdPaymentTermId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pdGSTId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        billTo: {
            type: DataTypes.STRING(150)
        },
        remark: {
            type: DataTypes.STRING(250) + ' CHARSET utf8 COLLATE utf8_unicode_ci'
        },
        address: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN
        },
        name: {
            type: DataTypes.STRING(250)
        },
        pdDeliveryToId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalBeforeTaxAmt:{
            type: DataTypes.DECIMAL(10,2)
        },
        totalTaxAmt:{
            type: DataTypes.DECIMAL(10,2)
        },
        totalLPOAmt:{
            type: DataTypes.DECIMAL(10,2)
        },
        createdDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedDateTime: {
            type: DataTypes.DATE
        },
        createdBy: {
            type: DataTypes.STRING(150)
        },
        updatedBy: {
            type: DataTypes.STRING(150)
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    LocalPOMaster.hasMany(models.LocalPOPart, { foreignKey: 'localPOId', sourceKey: 'id' });
                    LocalPOMaster.hasMany(models.LocalPOJob, { foreignKey: 'localPOId', sourceKey: 'id' });
                    LocalPOMaster.belongsTo(models.PDDeliveryTo, { foreignKey: 'pdDeliveryToId', sourceKey: 'id' });
                    LocalPOMaster.belongsTo(models.RepairOrderMaster, { foreignKey: 'repairOrderId', sourceKey: 'id' });
                    LocalPOMaster.belongsTo(models.PDPaymentTerm, { foreignKey: 'pdPaymentTermId', sourceKey: 'id' });
                    LocalPOMaster.belongsTo(models.PDLPOStatus, { foreignKey: 'statusId', sourceKey: 'id' });
                    LocalPOMaster.belongsTo(models.SubletMaster, { foreignKey: 'subletId', sourceKey: 'id' });
                    LocalPOMaster.belongsTo(models.PDSubletGST, { foreignKey: 'pdGSTId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return LocalPOMaster;
}
