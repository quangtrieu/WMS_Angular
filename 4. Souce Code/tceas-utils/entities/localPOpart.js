"use strict";

module.exports = function (sequelize, DataTypes) {
    var LocalPOPart = sequelize.define('LocalPOPart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        localPOId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        partId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unitPrice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        taxRate: {
            type: DataTypes.DECIMAL(10,2),
        },
        taxAmt: {
            type: DataTypes.DECIMAL(10,2),
        },
        retailPrice: {
            type: DataTypes.DECIMAL(10,2),
        },
        subletInvoiceNo: {
            type: DataTypes.STRING(50),
        },
        subletInvoiceDate: {
            type: DataTypes.DATE
        },
        dONo: {
            type: DataTypes.STRING(50),
        },
        remark: {
            type: DataTypes.STRING(250),
        },
        active: {
            type: DataTypes.BOOLEAN
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
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    LocalPOPart.belongsTo(models.LocalPOMaster, { foreignKey: 'localPOId', targetKey: 'id' });
                    LocalPOPart.belongsTo(models.PartMaster, { foreignKey: 'partId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return LocalPOPart;
}
