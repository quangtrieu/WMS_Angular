"use strict";

module.exports = function (sequelize, DataTypes) {
    var InvoiceMaster = sequelize.define('InvoiceMaster', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        vehicleCustomerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        repairOrderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        workShopId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        appointmentId: {
            type: DataTypes.INTEGER
        },
        dateTimeIn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        expectedDeliveryDateTime: {
            type: DataTypes.DATE
        },
        isCustomerWaiting: {
            type: DataTypes.BOOLEAN
        },
        vinNo: {
            type: DataTypes.STRING(20)
        },
        remarks: {
            type: DataTypes.STRING(250)
        },
        thirdPartyId: {
            type: DataTypes.INTEGER
        },
        vehicleChassisNo: {
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
        customerRequest: {
            type: DataTypes.STRING(1000) + ' CHARSET utf8 COLLATE utf8_unicode_ci'
        },
        totalLabourCharge: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        totalPartAmt: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        partDiscount: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        additionalDiscount: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        totalGoodwillAmt: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        taxAmt: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        totalAfterTaxAmt: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        createdDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        labourDiscount: {
            type: DataTypes.DECIMAL(18, 2)
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
        statusId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        serviceAdvisorId: {
            type: DataTypes.INTEGER
        },
        fullfilledBy: {
            type: DataTypes.STRING(150)
        },
        fullfilledDateTime: {
            type: DataTypes.DATE
        },
        latestFullfilmentNo: {
            type: DataTypes.STRING(150)
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    InvoiceMaster.belongsTo(models.VehicleCustomer, { foreignKey: 'vehicleCustomerId', targetKey: 'id' });
                    InvoiceMaster.belongsTo(models.WorkShop, { foreignKey: 'workShopId', targetKey: 'id' });
                    InvoiceMaster.belongsTo(models.Appointment, { foreignKey: 'appointmentId', targetKey: 'id' });
                    InvoiceMaster.belongsTo(models.PDInvoiceStatus, { foreignKey: 'statusId', targetKey: 'id' });
                    InvoiceMaster.hasMany(models.InvoicePart, { foreignKey: 'invoiceId', sourceKey: 'id' });
                    InvoiceMaster.hasMany(models.InvoiceJob, { foreignKey: 'invoiceId', sourceKey: 'id' });
                    InvoiceMaster.belongsTo(models.VehicleCustomer, { foreignKey: 'vehicleCustomerId', targetKey: 'id' });
                    InvoiceMaster.belongsTo(models.ServiceAdvisor, { foreignKey: 'serviceAdvisorId', targetKey: 'id' });
                    InvoiceMaster.belongsTo(models.RepairOrderMaster, { foreignKey: 'repairOrderId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return InvoiceMaster;
}
