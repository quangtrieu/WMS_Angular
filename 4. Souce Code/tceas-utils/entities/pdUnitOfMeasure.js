"use strict";

module.exports = function (sequelize, DataTypes) {
    var PDUnitOfMeasure = sequelize.define('PDUnitOfMeasure', {
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
                    PDUnitOfMeasure.hasMany(models.PartMaster, { foreignKey: 'uomId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return PDUnitOfMeasure;
}