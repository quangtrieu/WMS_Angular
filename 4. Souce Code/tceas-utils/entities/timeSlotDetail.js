"use strict";

module.exports = function (sequelize, DataTypes) {
    var TimeSlotDetail = sequelize.define('TimeSlotDetail', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        numberOfSlots: {
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
            type: DataTypes.STRING(150)
        },
        updatedBy: {
            type: DataTypes.STRING(150)
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        },
        timeSlotId: {
            type: DataTypes.INTEGER
        },
        version: {
            type: DataTypes.INTEGER
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    TimeSlotDetail.belongsTo(models.TimeSlotMaster, { foreignKey: 'timeSlotId', targetKey: 'id' });
                    TimeSlotDetail.hasMany(models.Appointment, { foreignKey: 'timeSlotDetailId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return TimeSlotDetail;
}
