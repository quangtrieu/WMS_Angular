"use strict";

module.exports = function (sequelize, DataTypes) {
    var AppointmentPart = sequelize.define('AppointmentPart', {
       id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        appointmentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jobId: {
            type: DataTypes.INTEGER
        },
        partId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        servicePackageId: {
            type: DataTypes.INTEGER
        },
        pdPartSourceId: {
            type: DataTypes.INTEGER
        },
        pdPaymentTypeId: {
            type: DataTypes.INTEGER
        },
        UOM: {
            type: DataTypes.DECIMAL(18, 2)
        },
        requestQty: {
            type: DataTypes.DECIMAL(18, 2)
        },
        unitPrice: {
            type: DataTypes.DECIMAL(18, 2)
        },
        discountPercent: {
            type: DataTypes.DECIMAL(18, 2)
        },
        discountAmt: {
            type: DataTypes.DECIMAL(18, 2)
        },
        totalAfterTaxAmt: {
            type: DataTypes.DECIMAL(18, 2)
        },
        availableQty: {
            type: DataTypes.INTEGER
        },
        fullfillQty: {
            type: DataTypes.INTEGER
        },
        subTotal: {
            type: DataTypes.INTEGER
        },
        goodWillPercent: {
            type: DataTypes.DECIMAL(18, 2)
        },
        goodWillAmt: {
            type: DataTypes.DECIMAL(18, 2)
        },
        netAmt: {
            type: DataTypes.DECIMAL(18, 2)
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    AppointmentPart.belongsTo(models.Appointment, { foreignKey: 'appointmentId', targetKey: 'id' });
                    AppointmentPart.belongsTo(models.JobMaster, { foreignKey: 'jobId', targetKey: 'id' });
                    AppointmentPart.belongsTo(models.PartMaster, { foreignKey: 'partId', targetKey: 'id' });
                    AppointmentPart.belongsTo(models.ServicePackageMaster, { foreignKey: 'servicePackageId', targetKey: 'id' });
                    AppointmentPart.belongsTo(models.PDPaymentType, { foreignKey: 'pdPaymentTypeId', targetKey: 'id' });
                    AppointmentPart.belongsTo(models.ServicePackageMaster, { foreignKey: 'servicePackageId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return AppointmentPart;
}
