"use strict";

module.exports = function (sequelize, DataTypes) {
    var PDTimeSlotInterval = sequelize.define('PDTimeSlotInterval', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(150)
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        createdDateTime: {
            type: DataTypes.DATE,
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
                  PDTimeSlotInterval.hasMany(models.TimeSlotMaster, {foreignKey: 'pdTimeSlotIntervalId', sourceKey: 'id'})
                }
            },
            timestamps: false
        });
    return PDTimeSlotInterval;
}
