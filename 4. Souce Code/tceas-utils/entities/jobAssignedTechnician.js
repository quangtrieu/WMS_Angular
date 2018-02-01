"use strict";

module.exports = function (sequelize, DataTypes) {
    var JobAssignedTechnician = sequelize.define('JobAssignedTechnician', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        jobFulfilmentItemId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        employeeId: {
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
        repairOrderId: {
            type: DataTypes.INTEGER
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    JobAssignedTechnician.belongsTo(models.JobFulfilmentItem, {foreignKey: 'jobFulfilmentItemId', targetKey: 'id'});
                    JobAssignedTechnician.belongsTo(models.Employee, {foreignKey: 'employeeId', targetKey: 'id'});
                    JobAssignedTechnician.belongsTo(models.RepairOrderMaster, {foreignKey: 'repairOrderId', targetKey: 'id'});
                }
            },
            timestamps: false
        });

    return JobAssignedTechnician;
}
