"use strict";

module.exports = function (sequelize, DataTypes) {
    var RepairOrderJob = sequelize.define('RepairOrderJob', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        repairOrderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        servicePackageId: {
            type: DataTypes.INTEGER
        },
        jobId: {
            type: DataTypes.INTEGER
        },
        pdComeBackJobId: {
            type: DataTypes.INTEGER
        },
        pdPaymentTypeId: {
            type: DataTypes.INTEGER
        },
        pdJobSourceId: {
            type: DataTypes.INTEGER
        },
        pdJobStatusId: {
            type: DataTypes.INTEGER
        },
        flatRate: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        labourCharge: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        discountPercent: {
            type: DataTypes.DECIMAL(18, 2)
        },
        discountAmt: {
            type: DataTypes.DECIMAL(18, 2),
        },
        subTotal: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        goodWillPercent: {
            type: DataTypes.DECIMAL(18, 2)
        },
        goodWillAmt: {
            type: DataTypes.DECIMAL(18, 2)
        },
        netAmt: {
            type: DataTypes.DECIMAL(18, 2)
        },
        createdDateTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedDateTime: {
            type: DataTypes.DATE
        },
        createdBy: {
            type: DataTypes.STRING(250)
        },
        updatedBy: {
            type: DataTypes.STRING(250)
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    RepairOrderJob.belongsTo(models.RepairOrderMaster, { foreignKey: 'repairOrderId', targetKey: 'id' });
                    RepairOrderJob.belongsTo(models.ServicePackageMaster, { foreignKey: 'servicePackageId', targetKey: 'id' });
                    RepairOrderJob.belongsTo(models.JobMaster, { foreignKey: 'jobId', sourceKey: 'id' });
                    RepairOrderJob.belongsTo(models.PDComeBackJob, { foreignKey: 'pdComeBackJobId', sourceKey: 'id' });
                    RepairOrderJob.belongsTo(models.PDJobStatus, { foreignKey: 'pdJobStatusId', sourceKey: 'id' });
                    RepairOrderJob.belongsTo(models.PDPaymentType, { foreignKey: 'pdPaymentTypeId', sourceKey: 'id' });
                    RepairOrderJob.belongsTo(models.PDJobSource, { foreignKey: 'pdJobSourceId', sourceKey: 'id' });
                    RepairOrderJob.hasOne(models.JobFulfilmentItem, { foreignKey: 'repairOrderJobId', sourceKey: 'id' })
                }
            },
            timestamps: false
        });
    return RepairOrderJob;
}
