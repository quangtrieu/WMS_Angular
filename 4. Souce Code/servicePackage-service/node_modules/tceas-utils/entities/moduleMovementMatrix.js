"use strict";

module.exports = function (sequelize, DataTypes) {
    var ModuleMovementMatrix = sequelize.define('ModuleMovementMatrix', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        moduleTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        movementTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sign: {
            type: DataTypes.STRING,
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
                     ModuleMovementMatrix.belongsTo(models.PDModuleType, { foreignKey: 'moduleTypeId', targetKey: 'id' });
                     ModuleMovementMatrix.belongsTo(models.PDMovementType, { foreignKey: 'movementTypeId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return ModuleMovementMatrix;
}
