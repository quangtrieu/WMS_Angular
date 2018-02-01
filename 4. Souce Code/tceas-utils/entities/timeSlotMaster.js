"use strict";

module.exports = function (sequelize, DataTypes) {
    var TimeSlotMaster = sequelize.define('TimeSlotMaster', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        breakStartTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        breakEndTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        baysPerSlot: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pdTimeSlotIntervalId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        workShopId: {
            type: DataTypes.INTEGER
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
                    TimeSlotMaster.hasMany(models.TimeSlotDetail, {foreignKey: 'timeSlotId', sourceKey: 'id'})
                    TimeSlotMaster.belongsTo(models.PDTimeSlotInterval, {foreignKey: 'pdTimeSlotIntervalId', sourceKey: 'id'})
                    TimeSlotMaster.belongsTo(models.WorkShop, { foreignKey: 'workShopId', targetKey: 'id' });
                }
            },
            timestamps: false
        });

    return TimeSlotMaster;
}
