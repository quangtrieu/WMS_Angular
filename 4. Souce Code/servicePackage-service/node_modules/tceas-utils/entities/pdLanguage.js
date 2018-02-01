"use strict";

module.exports = function (sequelize, DataTypes) {
    var PDLanguage = sequelize.define('PDLanguage', {
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
        status: {
            type: DataTypes.BOOLEAN
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    PDLanguage.hasMany(models.Customer, { foreignKey: 'firstlanguageId', sourceKey: 'id' })
                    //    PDLanguage.hasMany(models.JobMaster, {foreignKey: 'secondLanguageId', sourceKey: 'id'})
                }
            },
            timestamps: false
        });
    return PDLanguage;
}
