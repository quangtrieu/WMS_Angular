"use strict";

module.exports = function (sequelize, DataTypes) {
    var JobFulfilmentItem = sequelize.define('JobFulfilmentItem', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        jobFulfilmentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bayId: {
            type: DataTypes.INTEGER
        },
        repairOrderJobId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estimatedStartTime: {
            type: DataTypes.DATE
        },
        estimatedEndTime: {
            type: DataTypes.DATE
        },
        jobFulfilmentItemStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        remarks: {
            type: DataTypes.STRING(250)
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
            type: DataTypes.STRING(250)
        },
        updatedBy: {
            type: DataTypes.STRING(250)
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    JobFulfilmentItem.belongsTo(models.JobFulfilment, {foreignKey: 'jobFulfilmentId', targetKey: 'id'});
                    JobFulfilmentItem.belongsTo(models.Bay, {foreignKey: 'bayId', targetKey: 'id'});
                    JobFulfilmentItem.belongsTo(models.RepairOrderJob, {foreignKey: 'repairOrderJobId', targetKey: 'id'});
                    JobFulfilmentItem.belongsTo(models.PDJobFulfilmentItemStatus, {foreignKey: 'jobFulfilmentItemStatusId', targetKey: 'id'});
                    JobFulfilmentItem.hasMany(models.JobAssignedTechnician, {foreignKey: 'jobFulfilmentItemId', sourceKey: 'id'});
                    JobFulfilmentItem.hasMany(models.JobTracking, {foreignKey: 'jobFulfilmentItemId', sourceKey: 'id'});
                }
            },
            timestamps: false
        });

    return JobFulfilmentItem;
}
