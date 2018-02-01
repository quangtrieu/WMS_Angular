"use strict";

module.exports = function (sequelize, DataTypes) {
    var JobPartItem = sequelize.define('JobPartItem', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        jobPartId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        partId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    JobPartItem.belongsTo(models.JobPartMaster, { foreignKey: 'jobPartId', targetKey: 'id' });
                    JobPartItem.belongsTo(models.PartMaster, { foreignKey: 'partId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return JobPartItem;
}
