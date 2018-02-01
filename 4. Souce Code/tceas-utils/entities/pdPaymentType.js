"use strict";

module.exports = function (sequelize, DataTypes) {
    var PDPaymentType = sequelize.define('PDPaymentType', {
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
        description: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        isGoodWill: {
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
            type: DataTypes.STRING(250)
        },
        updatedBy: {
            type: DataTypes.STRING(250)
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    PDPaymentType.hasMany(models.RepairOrderJob, { foreignKey: 'pdPaymentTypeId', sourceKey: 'id' });
                    PDPaymentType.hasMany(models.RepairOrderPart, { foreignKey: 'pdPaymentTypeId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return PDPaymentType;
}
