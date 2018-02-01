"use strict";

module.exports = function (sequelize, DataTypes) {
    var PDPartSource = sequelize.define('PDPartSource', {
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
            type: DataTypes.STRING(250) + ' CHARSET utf8 COLLATE utf8_unicode_ci'
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
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    PDPartSource.hasMany(models.InvoicePart, { foreignKey: 'pdPartSourceId', sourceKey: 'id' })
                    PDPartSource.hasMany(models.RepairOrderPart, { foreignKey: 'pdPartSourceId', sourceKey: 'id' })
                }
            },
            timestamps: false
        });
    return PDPartSource;
}