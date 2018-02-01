"use strict";

module.exports = function (sequelize, DataTypes) {
    var InvoicePart = sequelize.define('InvoicePart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        invoiceId: {
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
        servicePackagePartId: {
            type: DataTypes.INTEGER
        },
        pdPartSourceId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pdPaymentTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        UOM: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        requestQty: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        unitPrice: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        discountPercent: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        discountAmt: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        totalAfterTaxAmt: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        availableQty: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fullfillQty: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        backOrderId: {
            type: DataTypes.INTEGER,
        },
        subTotal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        goodWillPercent: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        goodWillAmt: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        netAmt: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    InvoicePart.belongsTo(models.InvoiceMaster, { foreignKey: 'invoiceId', targetKey: 'id' });
                    InvoicePart.belongsTo(models.JobMaster, { foreignKey: 'jobId', targetKey: 'id' });
                    InvoicePart.belongsTo(models.PartMaster, { foreignKey: 'partId', targetKey: 'id' });
                    InvoicePart.belongsTo(models.ServicePackagePart, { foreignKey: 'servicePackagePartId', targetKey: 'id' });
                    InvoicePart.belongsTo(models.PDPaymentType, { foreignKey: 'pdPaymentTypeId', targetKey: 'id' });
                    InvoicePart.belongsTo(models.PDPartSource, { foreignKey: 'pdPartSourceId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return InvoicePart;
}
