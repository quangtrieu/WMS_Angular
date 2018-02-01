"use strict";

module.exports = function (sequelize, DataTypes) {
    var TimeSlotSpecialDay = sequelize.define('TimeSlotSpecialDay', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        specialDay: {
            type: DataTypes.DATE,
        },
        description: {
            type: DataTypes.STRING(250)
        },
        pdTimeSlotSpecialDayTypeId: {
            type: DataTypes.INTEGER,
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
    },
        {
            classMethods: {
                associate: function (models) {
                  TimeSlotSpecialDay.belongsTo(models.PDTimeSlotSpecialDayType, {foreignKey: 'pdTimeSlotSpecialDayTypeId', targetKey: 'id'});
                }
            },
            timestamps: false
        });
    return TimeSlotSpecialDay;
}
