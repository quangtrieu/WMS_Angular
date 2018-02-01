"use strict";

module.exports = function (sequelize, DataTypes) {
    var SubletJob = sequelize.define('SubletJob', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subletId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unitPrice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        active: {
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
                    SubletJob.belongsTo(models.SubletMaster, { foreignKey: 'subletId', targetKey: 'id' });
                    SubletJob.belongsTo(models.JobMaster, { foreignKey: 'jobId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return SubletJob;
}
