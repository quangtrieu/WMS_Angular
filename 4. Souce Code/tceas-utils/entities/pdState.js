"use strict";

module.exports = function (sequelize, DataTypes) {
    var PDState = sequelize.define('PDState', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pdCountryId: {
            type: DataTypes.INTEGER,
            allowNull: false
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
                    PDState.hasMany(models.PDState, { foreignKey: 'pdCountryId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return PDState;
}
