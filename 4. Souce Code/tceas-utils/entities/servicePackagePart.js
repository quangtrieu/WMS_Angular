"use strict";

module.exports = function (sequelize, DataTypes) {
    var ServicePackagePart = sequelize.define('ServicePackagePart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        servicePackageJobId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        partId: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unitPrice: {
            type: DataTypes.DECIMAL(18, 2),
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
                    ServicePackagePart.belongsTo(models.ServicePackageJob, { foreignKey: 'servicePackageJobId', targetKey: 'id' });
                    ServicePackagePart.belongsTo(models.PartMaster, { foreignKey: 'partId', targetKey: 'id' });
                }
            },
            timestamps: false
        });

    return ServicePackagePart;
}
