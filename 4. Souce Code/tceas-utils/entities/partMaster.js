"use strict";

module.exports = function (sequelize, DataTypes) {
    var PartMaster = sequelize.define('PartMaster', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uomId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING(250)
        },
        workShopId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN
        },
        isCentralized: {
            type: DataTypes.BOOLEAN
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
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
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    PartMaster.hasMany(models.PartPrice, { foreignKey: 'partId', sourceKey: 'id' });
                    PartMaster.hasMany(models.JobPartItem, { foreignKey: 'partId', sourceKey: 'id' });
                    PartMaster.hasMany(models.ServicePackagePart, { foreignKey: 'partId', sourceKey: 'id' });
                    PartMaster.hasMany(models.RepairOrderPart, { foreignKey: 'partId', sourceKey: 'id' });
                    PartMaster.hasMany(models.PartFulfillment, { foreignKey: 'partId', sourceKey: 'id' });
                    PartMaster.hasMany(models.PartSubstitute, { foreignKey: 'partId', sourceKey: 'id' });
                    PartMaster.hasMany(models.PartSubstitute, { foreignKey: 'partSubstituteId', sourceKey: 'id' });
                    PartMaster.hasMany(models.StockMovement, { foreignKey: 'partId', sourceKey: 'id' });
                    PartMaster.hasMany(models.PartVariant, { foreignKey: 'partId', sourceKey: 'id' });
                    PartMaster.hasMany(models.PartPrice, { foreignKey: 'partId', sourceKey: 'id' });
                    PartMaster.hasMany(models.InvoicePart, { foreignKey: 'partId', sourceKey: 'id' });
                    PartMaster.hasMany(models.LocalPOPart, { foreignKey: 'partId', sourceKey: 'id' });
                    PartMaster.hasMany(models.SubletPart, { foreignKey: 'partId', sourceKey: 'id' });
                    PartMaster.belongsTo(models.PDUnitOfMeasure, { foreignKey: 'uomId', targetKey: 'id' });
                    PartMaster.hasMany(models.GoodReceiveItem, { foreignKey: 'partId', sourceKey: 'id' });
                    PartMaster.hasMany(models.PartBin, { foreignKey: 'partId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return PartMaster;
}