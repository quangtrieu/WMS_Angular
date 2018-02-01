"use strict";

module.exports = function (sequelize, DataTypes) {
    var JobPartMaster = sequelize.define('JobPartMaster', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        vehicleVariantId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jobId: {
            type: DataTypes.INTEGER,
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
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    JobPartMaster.belongsTo(models.VehicleVariant, { foreignKey: 'vehicleVariantId', targetKey: 'id' });
                    JobPartMaster.belongsTo(models.JobMaster, { foreignKey: 'jobId', targetKey: 'id' });
                    JobPartMaster.hasMany(models.JobPartItem, { foreignKey: 'jobPartId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return JobPartMaster;
}
