"use strict";

module.exports = function (sequelize, DataTypes) {
    var ServicePackageVariant = sequelize.define('ServicePackageVariant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        servicePackageId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vehicleVariantId: {
            type: DataTypes.INTEGER,
            allowNull: false
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
    },
        {
            classMethods: {
                associate: function (models) {
                    ServicePackageVariant.belongsTo(models.VehicleVariant, { foreignKey: 'vehicleVariantId', targetKey: 'id' });
                    ServicePackageVariant.belongsTo(models.ServicePackageMaster, { foreignKey: 'servicePackageId', targetKey: 'id' });
                    ServicePackageVariant.hasMany(models.ServicePackageJob, { foreignKey: 'servicePackageVariantId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });

    return ServicePackageVariant;
}
