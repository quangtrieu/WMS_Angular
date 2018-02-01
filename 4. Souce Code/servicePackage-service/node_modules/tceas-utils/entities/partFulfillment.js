"use strict";

module.exports = function (sequelize, DataTypes) {
    var PartFulfillment = sequelize.define('PartFulfillment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        repairOrderPartId :
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        partId:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        binId:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        workshopId:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        roRequestQty:
        {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        outstandingQty:
        {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        fulfillmentQty:
        {
            type: DataTypes.DECIMAL(10,2)
        },
        collectedById:
        {
            type: DataTypes.INTEGER
        },
        collectedByName:
        {
            type: DataTypes.STRING(150)
        },
        isSubstitutePart:
        {
            type: DataTypes.BOOLEAN
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
                    PartFulfillment.hasMany(models.StockMovement, { foreignKey: 'fulfillmentId', sourceKey: 'id' });
                    PartFulfillment.belongsTo(models.RepairOrderPart, { foreignKey: 'repairOrderPartId', targetKey: 'id' });
                    PartFulfillment.belongsTo(models.PartMaster, { foreignKey: 'partId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return PartFulfillment;
}
