"use strict";

module.exports = function (sequelize, DataTypes) {
    var JobPrice = sequelize.define('JobPrice', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vehicleVariantId: {
            type: DataTypes.INTEGER
        },
        // operationCodeFRS: {
        //     type: DataTypes.STRING(150)
        // },
        // hoursFRS: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        retailPrice: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
        },
        warrantyPrice: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
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
                    JobPrice.belongsTo(models.JobMaster, { foreignKey: 'jobId', targetKey: 'id' })
                    JobPrice.belongsTo(models.VehicleVariant, { foreignKey: 'vehicleVariantId', targetKey: 'id' })
                }
            },
            timestamps: false
        });
    return JobPrice;
}
