"use strict";

module.exports = function (sequelize, DataTypes) {
    var PartVariant = sequelize.define('PartVariant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        partId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vehicleVariantId: {
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
            type: DataTypes.STRING(150)
        },
        updatedBy: {
            type: DataTypes.STRING(150)
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    PartVariant.belongsTo(models.PartMaster, { foreignKey: 'partId', targetKey: 'id' });
                    PartVariant.belongsTo(models.VehicleVariant, { foreignKey: 'vehicleVariantId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return PartVariant;
}