"use strict";

module.exports = function (sequelize, DataTypes) {
    var VehicleModel = sequelize.define('VehicleModel', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(150) + ' CHARSET utf8 COLLATE utf8_unicode_ci',
            allowNull: false
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
        vehicleMakeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    VehicleModel.belongsTo(models.VehicleMake, { foreignKey: 'vehicleMakeId', targetKey: 'id' });
                    VehicleModel.hasMany(models.VehicleVariant, { foreignKey: 'vehicleModelId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return VehicleModel;
}
