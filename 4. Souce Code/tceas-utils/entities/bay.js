"use strict";

module.exports = function (sequelize, DataTypes) {
    var Bay = sequelize.define('Bay', {
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
            type: DataTypes.STRING(250),
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        pdJobTypeId: {
            type: DataTypes.INTEGER
        },
        pdHoistId: {
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
            type: DataTypes.STRING(250)
        },
        updatedBy: {
            type: DataTypes.STRING(250)
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    Bay.belongsTo(models.PDJobType, { foreignKey: 'pdJobTypeId', targetKey: 'id' });
                    Bay.belongsTo(models.PDHoistType, { foreignKey: 'pdHoistId', targetKey: 'id' });
                    Bay.hasMany(models.BayEmployee, { foreignKey: 'bayId', sourceKey: 'id' })
                }
            },
            timestamps: false
        });
    return Bay;
}
