"use strict";

module.exports = function (sequelize, DataTypes) {
    var InspectionCheckListItem = sequelize.define('InspectionCheckListItem', {
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
        },
        inspectionCheckListId: {
            type: DataTypes.INTEGER,
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
                    InspectionCheckListItem.belongsTo(models.InspectionCheckList, { foreignKey: 'inspectionCheckListId', targetKey: 'id' });
                    InspectionCheckListItem.hasMany(models.InspectionQC, { foreignKey: 'inspectionCheckListItemId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return InspectionCheckListItem;
}