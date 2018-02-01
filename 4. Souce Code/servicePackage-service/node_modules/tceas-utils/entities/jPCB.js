"use strict";

module.exports = function (sequelize, DataTypes) {
    var JPCB = sequelize.define('JPCB', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        repairOrderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bayId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        serviceAdvisorId: {
            type: DataTypes.INTEGER
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        jPCBStatusId: {
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
                    JPCB.belongsTo(models.PDJPCBStatus, {foreignKey: 'jPCBStatusId', targetKey: 'id'});
                    JPCB.belongsTo(models.RepairOrderMaster, {foreignKey: 'repairOrderId', targetKey: 'id'});
                    JPCB.belongsTo(models.Bay, {foreignKey: 'bayId', targetKey: 'id'});
                    JPCB.belongsTo(models.ServiceAdvisor, {foreignKey: 'serviceAdvisorId', targetKey: 'id'});
                }
            },
            timestamps: false
        });
    return JPCB;
}
