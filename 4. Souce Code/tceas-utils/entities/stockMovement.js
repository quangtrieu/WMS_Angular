"use strict";

module.exports = function (sequelize, DataTypes) {
    var StockMovement = sequelize.define('StockMovement', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        partId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        typeId: {
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
        grnId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        adjId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fulfillmentId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        invoiceId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        decrease: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        increase: {
            type: DataTypes.DECIMAL,
            allowNull: false
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
                     StockMovement.belongsTo(models.PDMovementType, { foreignKey: 'typeId', targetKey: 'id' });
                     StockMovement.belongsTo(models.PartFulfillment, { foreignKey: 'fulfillmentId', targetKey: 'id' });
                     StockMovement.belongsTo(models.Bin, { foreignKey: 'binId', targetKey: 'id' });
                     StockMovement.belongsTo(models.PartMaster, { foreignKey: 'partId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return StockMovement;
}
