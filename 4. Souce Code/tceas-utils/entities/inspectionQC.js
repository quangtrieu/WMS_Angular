"use strict";

module.exports = function (sequelize, DataTypes) {
    var InspectionQC = sequelize.define('InspectionQC', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        repairOrderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        inspectionCheckListItemId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pdInspectionValueId: {
            type: DataTypes.INTEGER,
            allowNull: false
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
                    InspectionQC.belongsTo(models.PdInspectionValue, { foreignKey: 'pdInspectionValueId', sourceKey: 'id' });
                    InspectionQC.belongsTo(models.InspectionCheckListItem, { foreignKey: 'inspectionCheckListItemId', sourceKey: 'id' });
                    InspectionQC.belongsTo(models.RepairOrderMaster, { foreignKey: 'repairOrderId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return InspectionQC;
}
