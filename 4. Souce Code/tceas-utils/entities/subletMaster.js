"use strict";

module.exports = function (sequelize, DataTypes) {
    var SubletMaster = sequelize.define('SubletMaster', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        subletName: {
            type: DataTypes.STRING(250) + ' CHARSET utf8 COLLATE utf8_unicode_ci',
            allowNull: false,
        },
        idNumber: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN
        },
        contactPerson: {
            type: DataTypes.STRING(250)
        },
        contactPersonPhongNo: {
            type: DataTypes.STRING(50)
        },
        postalCode: {
            type: DataTypes.STRING(50)
        },
        extension: {
            type: DataTypes.STRING(250)
        },
        email: {
            type: DataTypes.STRING(250)
        },
        officeTelNo: {
            type: DataTypes.STRING(50)
        },
        faxNumber: {
            type: DataTypes.STRING(50)
        },
        address: {
            type: DataTypes.STRING(250)
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
                    SubletMaster.hasMany(models.SubletPart, { foreignKey: 'subletId', sourceKey: 'id' });
                    SubletMaster.hasMany(models.SubletJob, { foreignKey: 'subletId', sourceKey: 'id' });
                    SubletMaster.hasMany(models.LocalPOMaster, { foreignKey: 'subletId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return SubletMaster;
}
