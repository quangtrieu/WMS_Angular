"use strict";

module.exports = function (sequelize, DataTypes) {
    var Vehicle = sequelize.define('Vehicle', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        vehicleVariantId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        engineNo: {
            type: DataTypes.TEXT,
        },
        vinNo: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        chassisNo: {
            type: DataTypes.TEXT,
        },
        registrationDate: {
            type: DataTypes.DATE,
        },
        purchaseDate: {
            type: DataTypes.DATE,
        },
        niscareOrRenCare: {
            type: DataTypes.INTEGER,
        },
        npmp: {
            type: DataTypes.INTEGER,
        },
        warrantyPeriod: {
            type: DataTypes.INTEGER,
        },
        warrantyMilleage: {
            type: DataTypes.INTEGER,
        },
        warrantyExpiryDate: {
            type: DataTypes.DATE,
        }, 
        extendedWarrantyPeriod: {
            type: DataTypes.INTEGER,
        },
        extendedWarrantyMilleage: {
            type: DataTypes.INTEGER,
        },
        extendedWarrantyExpiryDate: {
            type: DataTypes.DATE,
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
                    Vehicle.hasMany(models.VehicleCustomer, { foreignKey: 'vehicleId', sourceKey: 'id' });
                    Vehicle.belongsTo(models.VehicleVariant, { foreignKey: 'vehicleVariantId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return Vehicle;
}
