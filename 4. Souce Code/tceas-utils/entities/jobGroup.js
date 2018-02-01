"use strict";

module.exports = function (sequelize, DataTypes) {
    var JobGroup = sequelize.define('JobGroup', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING(250) + ' CHARSET utf8 COLLATE utf8_unicode_ci'
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
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    JobGroup.hasMany(models.JobSection, { foreignKey: 'jobGroupId', sourceKey: 'id' }),
                        JobGroup.hasMany(models.JobMaster, { foreignKey: 'jobGroupId', sourceKey: 'id' })
                }
            },
            timestamps: false
        });
    return JobGroup;
}
