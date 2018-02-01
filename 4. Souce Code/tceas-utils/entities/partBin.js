"use strict";

module.exports = function (sequelize, DataTypes) {
    var PartBin = sequelize.define('PartBin', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        partId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        binId: {
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
                    PartBin.belongsTo(models.Bin, { foreignKey: 'binId', targetKey: 'id' });
                    PartBin.belongsTo(models.PartMaster, { foreignKey: 'partId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return PartBin;
}