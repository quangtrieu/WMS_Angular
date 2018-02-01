module.exports = function (sequelize, DataTypes) {
    var ServicePackageMaster = sequelize.define('ServicePackageMaster', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pdPackageTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING(250) + ' CHARSET utf8 COLLATE utf8_unicode_ci',
            allowNull: false
        },
        isCentralized: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        workShopId: {
            type: DataTypes.INTEGER
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
                    ServicePackageMaster.belongsTo(models.WorkShop, { foreignKey: 'workShopId', targetKey: 'id' });
                    ServicePackageMaster.belongsTo(models.PDPackageType, { foreignKey: 'pdPackageTypeId', targetKey: 'id' });
                    ServicePackageMaster.hasMany(models.ServicePackageVariant, { foreignKey: 'servicePackageId', sourceKey: 'id' });
                    ServicePackageMaster.hasMany(models.ServicePackageVersion, { foreignKey: 'servicePackageId', sourceKey: 'id' });
                    ServicePackageMaster.hasMany(models.RepairOrderJob, { foreignKey: 'servicePackageId', sourceKey: 'id' });
                    ServicePackageMaster.hasMany(models.RepairOrderPart, { foreignKey: 'servicePackageId', sourceKey: 'id' });
                }
            },
            timestamps: false
        });

    return ServicePackageMaster;
}
