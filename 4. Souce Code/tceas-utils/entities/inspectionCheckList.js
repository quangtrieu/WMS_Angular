"use strict";

module.exports = function (sequelize, DataTypes) {
    var InspectionCheckList = sequelize.define('InspectionCheckList', {
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
                    InspectionCheckList.hasMany(models.InspectionCheckListItem, { foreignKey: 'inspectionCheckListId', sourceKey: 'id' });
                }

            },
            timestamps: false
        });
    return InspectionCheckList;
}