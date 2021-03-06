"use strict";

module.exports = function (sequelize, DataTypes) {
    var Bin = sequelize.define('Bin', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        workshopId : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING(250),
        },
        status: {
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
            type: DataTypes.STRING
        },
        updatedBy: {
            type: DataTypes.STRING
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    Bin.hasMany(models.StockMovement, { foreignKey: 'binId', sourceKey: 'id' });
                    Bin.hasMany(models.StockDailyBalance, { foreignKey: 'binId', targetKey: 'id' });
                    Bin.hasMany(models.GoodReceiveItem, { foreignKey: 'binId', sourceKey: 'id' });
                    Bin.hasMany(models.PartBin, { foreignKey: 'binId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return Bin;
}