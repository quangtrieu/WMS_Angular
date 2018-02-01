"use strict";

module.exports = function (sequelize, DataTypes) {
    var BayEmployee = sequelize.define('BayEmployee', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bayId: {
            type: DataTypes.INTEGER,
        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: true
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
                    BayEmployee.belongsTo(models.Employee, { foreignKey: 'employeeId', targetKey: 'id' });
                    BayEmployee.belongsTo(models.Bay, { foreignKey: 'bayId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return BayEmployee;
}
