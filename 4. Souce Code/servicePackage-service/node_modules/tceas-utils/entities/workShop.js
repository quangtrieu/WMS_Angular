"use strict";

module.exports = function (sequelize, DataTypes) {
    var WorkShop = sequelize.define('WorkShop', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pdWorkShopTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pdCityId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        status: {
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
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        },
        address: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        telephoneNo: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        psxWorkshop: {
            type: DataTypes.BOOLEAN
        },
        spcIntegration: {
            type: DataTypes.BOOLEAN
        },
        runningProductivity: {
            type: DataTypes.BOOLEAN
        },
        combineRenault: {
            type: DataTypes.BOOLEAN
        },
        standaloneRenault: {
            type: DataTypes.BOOLEAN
        },
        poNotificationEmailFrom: {
            type: DataTypes.STRING(250),
            validate: {
                isEmail: true
            }
        },
        poNotificationEmailTo: {
            type: DataTypes.STRING(250),
            validate: {
                isEmail: true
            }
        },
        poNotificationEmailCC: {
            type: DataTypes.STRING(250),
            validate: {
                isEmail: true
            }
        },
        lCSISMSShortName: {
            type: DataTypes.STRING(250)
        },
        lCSIWorkshopContact: {
            type: DataTypes.STRING(250)
        },
        gSTServiceLocation: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        bPCode: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        bPCode1: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        pdRegionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        companyRegistrationNo: {
            type: DataTypes.STRING(250)
        },
        totalWorkbayNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pdCountryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    WorkShop.belongsTo(models.PDWorkShopType, { foreignKey: 'pdWorkShopTypeId', targetKey: 'id' });
                    WorkShop.belongsTo(models.PDCity, { foreignKey: 'pdCityId', targetKey: 'id' });
                    WorkShop.belongsTo(models.PDRegion, { foreignKey: 'pdRegionId', targetKey: 'id' });
                    WorkShop.belongsTo(models.PDCountry, { foreignKey: 'pdCountryId', targetKey: 'id' });
                    WorkShop.hasMany(models.RepairOrderMaster, { foreignKey: 'workShopId', sourceKey: 'id' });
                    WorkShop.hasMany(models.ServicePackageMaster, { foreignKey: 'workShopId', sourceKey: 'id' });
                    WorkShop.hasMany(models.JobMaster, { foreignKey: 'workShopId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });
    return WorkShop;
}
