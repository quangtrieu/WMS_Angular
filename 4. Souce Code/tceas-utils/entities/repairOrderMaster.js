"use strict";

module.exports = function (sequelize, DataTypes) {
    var RepairOrderMaster = sequelize.define('RepairOrderMaster', {
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
        isExpressService: {
            type: DataTypes.BOOLEAN
        },
        vinNo: {
            type: DataTypes.STRING(20)
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
        labourDiscount: {
            type: DataTypes.DECIMAL(18, 2)
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
            type: DataTypes.DECIMAL(18, 4),
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
        isContactPerson: {
            type: DataTypes.BOOLEAN
        },
        isNPMPCustomer: {
            type: DataTypes.BOOLEAN
        },
        contactPerson: {
            type: DataTypes.STRING(50)
        },
        contactPersonMobileNo: {
            type: DataTypes.STRING(250)
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    RepairOrderMaster.belongsTo(models.VehicleCustomer, { foreignKey: 'vehicleCustomerId', targetKey: 'id' });
                    RepairOrderMaster.belongsTo(models.WorkShop, { foreignKey: 'workShopId', targetKey: 'id' });
                    RepairOrderMaster.belongsTo(models.Appointment, { foreignKey: 'appointmentId', targetKey: 'id' });
                    RepairOrderMaster.belongsTo(models.PDRepairOrderStatus, { foreignKey: 'statusId', targetKey: 'id' });
                    RepairOrderMaster.hasMany(models.RepairOrderPart, { foreignKey: 'repairOrderId', sourceKey: 'id' });
                    RepairOrderMaster.hasMany(models.RepairOrderJob, { foreignKey: 'repairOrderId', sourceKey: 'id' });
                    RepairOrderMaster.belongsTo(models.VehicleCustomer, { foreignKey: 'vehicleCustomerId', targetKey: 'id' });
                    RepairOrderMaster.belongsTo(models.ServiceAdvisor, { foreignKey: 'serviceAdvisorId', targetKey: 'id' });
                    RepairOrderMaster.hasMany(models.JobAssignedTechnician, { foreignKey: 'repairOrderId', targetKey: 'id' });
                    RepairOrderMaster.hasMany(models.InvoiceMaster, { foreignKey: 'repairOrderId', targetKey: 'id' });
                    RepairOrderMaster.hasMany(models.LocalPOMaster, { foreignKey: 'repairOrderId', targetKey: 'id' });
                    RepairOrderMaster.hasMany(models.InspectionQC, { foreignKey: 'repairOrderId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return RepairOrderMaster;
}
