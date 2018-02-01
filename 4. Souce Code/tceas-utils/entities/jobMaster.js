"use strict";

module.exports = function (sequelize, DataTypes) {
    var JobMaster = sequelize.define('JobMaster', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        jobGroupId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pdJobTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        workShopId: {
            type: DataTypes.INTEGER
        },
        code: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING(250) + ' CHARSET utf8 COLLATE utf8_unicode_ci'
        },
        isCentralized: {
            type: DataTypes.BOOLEAN
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
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    JobMaster.belongsTo(models.JobGroup, { foreignKey: 'jobGroupId', targetKey: 'id' });
                    JobMaster.belongsTo(models.PDJobType, { foreignKey: 'pdJobTypeId', targetKey: 'id' });
                    JobMaster.belongsTo(models.WorkShop, { foreignKey: 'workShopId', targetKey: 'id' });
                    JobMaster.hasMany(models.JobPrice, { foreignKey: 'jobId', sourceKey: 'id' });
                    JobMaster.hasMany(models.JobPartMaster, { foreignKey: 'jobId', sourceKey: 'id' });
                    JobMaster.hasMany(models.ServicePackageJob, { foreignKey: 'jobId', sourceKey: 'id' });
                    JobMaster.hasMany(models.RepairOrderJob, { foreignKey: 'jobId', sourceKey: 'id' });
                    JobMaster.hasMany(models.JobVersion, { foreignKey: 'jobId', sourceKey: 'id' });
                    JobMaster.hasMany(models.InvoiceJob, { foreignKey: 'jobId', sourceKey: 'id' });
                    JobMaster.hasMany(models.LocalPOJob, { foreignKey: 'jobId', sourceKey: 'id' });
                    JobMaster.hasMany(models.SubletJob, { foreignKey: 'jobId', sourceKey: 'id' });
                    JobMaster.hasMany(models.RepairOrderPart, { foreignKey: 'jobId', sourceKey: 'id' })
                }
            },
            timestamps: false
        });
    return JobMaster;
}
