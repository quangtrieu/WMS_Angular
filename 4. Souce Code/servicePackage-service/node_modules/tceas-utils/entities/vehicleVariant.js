"use strict";

module.exports = function (sequelize, DataTypes) {
    var VehicleVariant = sequelize.define('VehicleVariant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING(250) + ' CHARSET utf8 COLLATE utf8_unicode_ci'
        },
        status: {
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
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        },
        vehicleModelId: {
            type: DataTypes.INTEGER
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    VehicleVariant.belongsTo(models.VehicleModel, { foreignKey: 'vehicleModelId', targetKey: 'id' });
                    VehicleVariant.hasMany(models.Vehicle, { foreignKey: 'vehicleVariantId', sourceKey: 'id' });
                    VehicleVariant.hasMany(models.JobPartMaster, { foreignKey: 'vehicleVariantId', sourceKey: 'id' });
                    VehicleVariant.hasMany(models.ServicePackageVariant, { foreignKey: 'vehicleVariantId', sourceKey: 'id' });
                    VehicleVariant.hasMany(models.JobPrice, { foreignKey: 'vehicleVariantId', sourceKey: 'id' });
                    VehicleVariant.hasMany(models.PartVariant, { foreignKey: 'vehicleVariantId', sourceKey: 'id' });
             }
            },
            timestamps: false
        });
    return VehicleVariant;
}
