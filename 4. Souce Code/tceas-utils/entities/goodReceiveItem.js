"use strict";

module.exports = function (sequelize, DataTypes) {
    var GoodReceiveItem = sequelize.define('GoodReceiveItem', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        partId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        grnId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        binId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ReceivedQty: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
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
                    GoodReceiveItem.belongsTo(models.GoodReceiveMaster, { foreignKey: 'grnId', targetKey: 'id' });
                    GoodReceiveItem.belongsTo(models.Bin, { foreignKey: 'binId', targetKey: 'id' });
                    GoodReceiveItem.belongsTo(models.PartMaster, { foreignKey: 'partId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return GoodReceiveItem;
}