"use strict";

module.exports = function (sequelize, DataTypes) {
    var ServicePackageVersion = sequelize.define('ServicePackageVersion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        servicePackageId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        version: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        effectiveFrom: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        effectiveTo: {
            type: DataTypes.DATE
        },
        milleage: {
            type: DataTypes.INTEGER
        },
        taxCode: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        taxAmount: {
            type: DataTypes.DECIMAL(18, 2),
        },
        createdDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        createdBy: {
            type: DataTypes.STRING(150)
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    ServicePackageVersion.belongsTo(models.ServicePackageMaster, { foreignKey: 'servicePackageId', targetKey: 'id' });
                }
            },
            timestamps: false
        });

    return ServicePackageVersion;
}
