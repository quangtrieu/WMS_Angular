"use strict";

module.exports = function (sequelize, DataTypes) {
    var JobTracking = sequelize.define('JobTracking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        jobFulfilmentItemId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endTime: {
            type: DataTypes.DATE
        },
        jobTrackingStatusId: {
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
                    JobTracking.belongsTo(models.JobFulfilmentItem, {foreignKey: 'jobFulfilmentItemId', targetKey: 'id'});
                    JobTracking.belongsTo(models.PDJobTrackingStatus, {foreignKey: 'jobTrackingStatusId', targetKey: 'id'});
                }
            },
            timestamps: false
        });
    return JobTracking;
}
