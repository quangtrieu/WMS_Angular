"use strict";

module.exports = function (sequelize, DataTypes) {
    var GoodReceiveMaster = sequelize.define('GoodReceiveMaster', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        workshopId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        poNo: {
            type: DataTypes.STRING(150) + ' CHARSET utf8 COLLATE utf8_unicode_ci',
            allowNull: false,
        },
        poDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        grnDate: {
            type: DataTypes.DATE
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
                    GoodReceiveMaster.hasMany(models.GoodReceiveItem, { foreignKey: 'grnId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return GoodReceiveMaster;
}
