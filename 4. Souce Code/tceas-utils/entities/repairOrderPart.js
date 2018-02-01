"use strict";

module.exports = function (sequelize, DataTypes) {
    var RepairOrderPart = sequelize.define('RepairOrderPart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        repairOrderId: {
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
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pdPaymentTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        UOM: {
            type: DataTypes.DECIMAL(18, 2)
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
            type: DataTypes.INTEGER,
            allowNull: false
        },
        goodWillPercent: {
            type: DataTypes.DECIMAL(18, 2)
        },
        goodWillAmt: {
            type: DataTypes.DECIMAL(18, 2)
        },
        netAmt: {
            type: DataTypes.DECIMAL(18, 2)
        },
        createdDateTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedDateTime: {
            type: DataTypes.DATE
        },
        createdBy: {
            type: DataTypes.STRING(250)
        },
        updatedBy: {
            type: DataTypes.STRING(250)
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    RepairOrderPart.belongsTo(models.RepairOrderMaster, { foreignKey: 'repairOrderId', targetKey: 'id' });
                    RepairOrderPart.belongsTo(models.JobMaster, { foreignKey: 'jobId', targetKey: 'id' });
                    RepairOrderPart.belongsTo(models.PartMaster, { foreignKey: 'partId', targetKey: 'id' });
                    RepairOrderPart.belongsTo(models.ServicePackageMaster, { foreignKey: 'servicePackageId', targetKey: 'id' });
                    RepairOrderPart.belongsTo(models.PDPaymentType, { foreignKey: 'pdPaymentTypeId', targetKey: 'id' });
                    RepairOrderPart.belongsTo(models.PDPartSource, { foreignKey: 'pdPartSourceId', targetKey: 'id' });
                    RepairOrderPart.hasMany(models.PartFulfillment, { foreignKey: 'repairOrderPartId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return RepairOrderPart;
}
