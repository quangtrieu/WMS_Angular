"use strict";

module.exports = function (sequelize, DataTypes) {
    var PartSubstitue = sequelize.define('PartSubstitute', {
        // id: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true,
        // },
        partId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        partSubstituteId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
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
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    PartSubstitue.belongsTo(models.PartMaster, { foreignKey: 'partId', targetKey: 'id' });
                    PartSubstitue.belongsTo(models.PartMaster, { foreignKey: 'partSubstituteId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return PartSubstitue;
}