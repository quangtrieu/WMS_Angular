"use strict";

module.exports = function (sequelize, DataTypes) {
    var InvoiceJob = sequelize.define('InvoiceJob', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        invoiceId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        servicePackageJobId: {
            type: DataTypes.INTEGER
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pdComeBackJobId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pdPaymentTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pdJobSourceId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pdJobStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        flatRate: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        labourCharge: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        discountPercent: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        subTotal: {
            type: DataTypes.DECIMAL(18, 2),
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
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    InvoiceJob.belongsTo(models.InvoiceMaster, { foreignKey: 'invoiceId', targetKey: 'id' });
                    InvoiceJob.belongsTo(models.ServicePackageJob, { foreignKey: 'servicePackageJobId', targetKey: 'id' });
                    InvoiceJob.belongsTo(models.JobMaster, { foreignKey: 'jobId', sourceKey: 'id' });
                    InvoiceJob.belongsTo(models.PDComeBackJob, { foreignKey: 'pdComeBackJobId', sourceKey: 'id' });
                    InvoiceJob.belongsTo(models.PDJobStatus, { foreignKey: 'pdJobStatusId', sourceKey: 'id' });
                    InvoiceJob.belongsTo(models.PDPaymentType, { foreignKey: 'pdPaymentTypeId', sourceKey: 'id' });
                    InvoiceJob.belongsTo(models.PDJobSource, { foreignKey: 'pdJobSourceId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return InvoiceJob;
}
