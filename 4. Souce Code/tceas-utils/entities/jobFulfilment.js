"use strict";

module.exports = function (sequelize, DataTypes) {
    var JobFulfilment = sequelize.define('JobFulfilment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        repairOrderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        suggestedBayId: {
            type: DataTypes.INTEGER
        },
        jobFulfilmentStatusId: {
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
        serviceAdvisorId: {
            type: DataTypes.INTEGER
        },
    }, {
        classMethods: {
            associate: function (models) {
                JobFulfilment.belongsTo(models.PDJobFulfilmentStatus, {
                    foreignKey: 'jobFulfilmentStatusId',
                    targetKey: 'id'
                });
                JobFulfilment.belongsTo(models.RepairOrderMaster, {
                    foreignKey: 'repairOrderId',
                    targetKey: 'id'
                });
                JobFulfilment.belongsTo(models.Bay, {
                    foreignKey: 'suggestedBayId',
                    targetKey: 'id'
                });
                JobFulfilment.belongsTo(models.ServiceAdvisor, {
                    foreignKey: 'serviceAdvisorId',
                    targetKey: 'id'
                });
            }
        },
        timestamps: false
    });
    return JobFulfilment;
}