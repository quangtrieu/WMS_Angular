"use strict";

module.exports = function (sequelize, DataTypes) {
    var Appointment = sequelize.define('Appointment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        appointmentNo: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        appointmentStatusId: {
            type: DataTypes.INTEGER
        },
        timeSlotDetailId: {
            type: DataTypes.INTEGER
        },
        timeSlotDate: {
            type: DataTypes.DATEONLY
        },
        vehicleCustomerId: {
            type: DataTypes.INTEGER
        },
        workShopId: {
            type: DataTypes.INTEGER
        },
        engineNo: {
            type: DataTypes.STRING(20)
        },
        chassisNo: {
            type: DataTypes.STRING(50)
        },
        mobilePhoneNo: {
            type: DataTypes.STRING(50)
        },
        previousMilleage: {
            type: DataTypes.BIGINT
        },
        currentMilleage: {
            type: DataTypes.BIGINT
        },
        remarks: {
            type: DataTypes.STRING(500) + ' CHARSET utf8 COLLATE utf8_unicode_ci'
        },
        serviceAdvisorId: {
            type: DataTypes.INTEGER
        },
        totalLabourCharge: {
            type: DataTypes.DECIMAL(18, 2)
        },
        totalPartAmt: {
            type: DataTypes.DECIMAL(18, 2)
        },
        partDiscount: {
            type: DataTypes.DECIMAL(18, 2)
        },
        additionalDiscount: {
            type: DataTypes.DECIMAL(18, 2)
        },
        totalGoodwillAmt: {
            type: DataTypes.DECIMAL(18, 2)
        },
        salesTaxAmt: {
            type: DataTypes.DECIMAL(18, 2)
        },
        totalAfterTaxAmt: {
            type: DataTypes.DECIMAL(18, 2)
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
                    Appointment.belongsTo(models.VehicleCustomer, { foreignKey: 'vehicleCustomerId', targetKey: 'id' });
                    Appointment.belongsTo(models.TimeSlotDetail, { foreignKey: 'timeSlotDetailId', targetKey: 'id' });
                    Appointment.hasOne(models.RepairOrderMaster, { foreignKey: 'appointmentId', sourceKey: 'id' });
                    Appointment.belongsTo(models.PDAppointmentStatus, { foreignKey: 'appointmentStatusId', targetKey: 'id' });
                    Appointment.hasMany(models.AppointmentPart, { foreignKey: 'appointmentId', sourceKey: 'id' });
                    Appointment.hasMany(models.AppointmentJob, { foreignKey: 'appointmentId', sourceKey: 'id' });
                    Appointment.belongsTo(models.WorkShop, { foreignKey: 'workShopId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return Appointment;
}
