"use strict";

module.exports = function (sequelize, DataTypes) {
    var JobVersion = sequelize.define('JobVersion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        version: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        effectiveFrom: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        effectiveTo: {
            type: DataTypes.DATE
        },
        createdDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        createdBy: {
            type: DataTypes.STRING(150)
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    JobVersion.belongsTo(models.JobMaster, { foreignKey: 'jobId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return JobVersion;
}
