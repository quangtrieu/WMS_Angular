"use strict";

module.exports = function (sequelize, DataTypes) {
    var PdInspectionValue = sequelize.define('PdInspectionValue', {
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
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
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
                    PdInspectionValue.hasOne(models.InspectionItem, { foreignKey: 'pdInspectionValueId', sourceKey: 'id' });
                    PdInspectionValue.hasMany(models.InspectionQC, { foreignKey: 'pdInspectionValueId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return PdInspectionValue;
}
