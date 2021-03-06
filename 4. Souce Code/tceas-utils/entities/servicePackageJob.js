"use strict";

module.exports = function (sequelize, DataTypes) {
    var ServicePackageJob = sequelize.define('ServicePackageJob', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        servicePackageVariantId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jobId: {
            type: DataTypes.INTEGER
        },
        labourCharge: {
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
                    ServicePackageJob.belongsTo(models.ServicePackageVariant, { foreignKey: 'servicePackageVariantId', targetKey: 'id' });
                    ServicePackageJob.belongsTo(models.JobMaster, { foreignKey: 'jobId', targetKey: 'id' });
                    ServicePackageJob.hasMany(models.ServicePackagePart, { foreignKey: 'servicePackageJobId', sourceKey: 'id' })
                }
            },
            timestamps: false
        });

    return ServicePackageJob;
}
