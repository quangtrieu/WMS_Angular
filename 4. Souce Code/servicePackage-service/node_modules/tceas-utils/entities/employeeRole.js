"use strict";

module.exports = function (sequelize, DataTypes) {
    var EmployeeRole = sequelize.define('EmployeeRole', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        employeeId: {
            type: DataTypes.INTEGER,
        },
        pdEmployeeRoleId: {
            type: DataTypes.INTEGER,
        },
        checked: {
            type: DataTypes.BOOLEAN,
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
                    EmployeeRole.belongsTo(models.PDEmployeeRole, {foreignKey: 'pdEmployeeRoleId', targetKey: 'id'});
                    EmployeeRole.belongsTo(models.Employee, {foreignKey: 'employeeId', targetKey: 'id'});
                }
            },
            timestamps: false
        });
    return EmployeeRole;
}
