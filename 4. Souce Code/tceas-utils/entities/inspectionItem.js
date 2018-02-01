"use strict";

module.exports = function (sequelize, DataTypes) {
    var InspectionItem = sequelize.define('InspectionItem', {
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
        inspectionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pdInspectionValueId: {
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
                    InspectionItem.belongsTo(models.InspectionMaster, { foreignKey: 'inspectionId', targetKey: 'id' });
                    InspectionItem.belongsTo(models.PdInspectionValue, { foreignKey: 'pdInspectionValueId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return InspectionItem;
}