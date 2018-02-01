"use strict";

module.exports = function (sequelize, DataTypes) {
    var JobSection = sequelize.define('JobSection', {
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
        jobGroupId: {
            type: DataTypes.INTEGER
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    JobSection.belongsTo(models.JobGroup, { foreignKey: 'jobGroupId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return JobSection;
}
