"use strict";

module.exports = function (sequelize, DataTypes) {
    var PartPrice = sequelize.define('PartPrice', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        partId: {
            type: DataTypes.INTEGER
        },
		vehicleVariantId: {
            type: DataTypes.INTEGER
        },
        version: {
            type: DataTypes.INTEGER
        },
        netPrice: {
            type: DataTypes.DECIMAL(10,2)
        },
        retailPrice: {
            type: DataTypes.DECIMAL(10,2)
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
                    PartPrice.belongsTo(models.PartMaster, {foreignKey: 'partId', targetKey: 'id'});
                 }
            },
            timestamps: false
        });
    return PartPrice;
}