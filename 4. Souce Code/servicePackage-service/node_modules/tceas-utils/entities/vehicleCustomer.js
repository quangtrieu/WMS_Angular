"use strict";

module.exports = function (sequelize, DataTypes) {
    var VehicleCustomer = sequelize.define('VehicleCustomer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        registrationNo: {
            type: DataTypes.STRING(32),
            unique: true
        },
        isOwner: {
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
            type: DataTypes.STRING(150)
        },
        updatedBy: {
            type: DataTypes.STRING(150)
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    VehicleCustomer.belongsTo(models.Customer, { foreignKey: 'customerId', targetKey: 'id' });
                    VehicleCustomer.belongsTo(models.Vehicle, { foreignKey: 'vehicleId', targetKey: 'id' });
                    VehicleCustomer.hasMany(models.Appointment, { foreignKey: 'vehicleCustomerId', sourceKey: 'id' });
                    VehicleCustomer.hasMany(models.RepairOrderMaster, { foreignKey: 'vehicleCustomerId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return VehicleCustomer;
}