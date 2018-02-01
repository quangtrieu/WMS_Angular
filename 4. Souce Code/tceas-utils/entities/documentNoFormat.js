"use strict";

module.exports = function (sequelize, DataTypes) {
    var DocumentNoFormat = sequelize.define('DocumentNoFormat', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        workshopCode: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        documentCode: {
            type: DataTypes.STRING(250),
        },
        documentModule: {
            type: DataTypes.STRING(250),
        },
        format: {
            type: DataTypes.STRING(250),
        },
        isPrefixWithBranchCode: {
            type: DataTypes.BOOLEAN
        },
        isPrefixWithDate: {
            type: DataTypes.BOOLEAN
        },
        startNo: {
            type: DataTypes.INTEGER
        },
        runningNo: {
            type: DataTypes.INTEGER
        },
        runningNoLength: {
            type: DataTypes.INTEGER
        },
        isMonthlyReset: {
            type: DataTypes.BOOLEAN
        },
        isActive: {
            type: DataTypes.BOOLEAN
        }//
    },
        {
            classMethods: {
                associate: function (models) {
                }
            },
            timestamps: false
        });
    return DocumentNoFormat;
}