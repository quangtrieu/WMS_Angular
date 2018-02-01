"use strict";

module.exports = function (sequelize, DataTypes) {
    var DocumentNo = sequelize.define('DocumentNo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        workShopId: {
            type: DataTypes.INTEGER
        },
        workShopCode: {
            type: DataTypes.STRING(250),
        },
        documentCode: {
            type: DataTypes.STRING(125),
        },
        documentModule: {
            type: DataTypes.STRING(125),
        },
        format: {
            type: DataTypes.STRING(250),
        },
        remark: {
            type: DataTypes.STRING(10),
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
                    
                }
            },
            timestamps: false
        });
    return DocumentNo;
}