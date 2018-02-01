"use strict";

module.exports = function (sequelize, DataTypes) {
    var PDTimeSlotSpecialDayType = sequelize.define('PDTimeSlotSpecialDayType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
                  PDTimeSlotSpecialDayType.hasMany(models.TimeSlotSpecialDay, {foreignKey: 'pdTimeSlotSpecialDayTypeId', sourceKey: 'id'})
                }
            },
            timestamps: false
        });
    return PDTimeSlotSpecialDayType;
}
