"use strict";

module.exports = function (sequelize, DataTypes) {
    var StockDailyBalance = sequelize.define('StockDailyBalance', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        partId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        workshopId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        binId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        onHandQty: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        reservedQty: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        availableQty: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN
        },
        createdDateTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedDateTime: {
            type: DataTypes.DATE
        },
        createdBy: {
            type: DataTypes.STRING
        },
        modifiedBy: {
            type: DataTypes.STRING
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    StockDailyBalance.belongsTo(models.Bin, { foreignKey: 'binId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return StockDailyBalance;
}
