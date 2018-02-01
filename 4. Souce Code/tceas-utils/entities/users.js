"use strict";

module.exports = function(sequelize,DataTypes)
{
    var Users = sequelize.define('Users',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        passwords: {
             type: DataTypes.STRING
        }, // save list password of user
        passwordSalt:{
             type: DataTypes.STRING
        },
        isLockedOut: {
            type: DataTypes.INTEGER
        },
        isDisabled: {
            type: DataTypes.INTEGER
        },
        fullName: {
            type: DataTypes.STRING
        },
        createdDateTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedDateTime: {
            type: DataTypes.DATE
        },
        lastLoginDate: {
            type: DataTypes.DATE
        },
        lastPasswordChangeDate: {
            type: DataTypes.DATE
        },
        failedPasswordDate: {
            type: DataTypes.DATE
        },
        failedPasswordCount: {
            type: DataTypes.INTEGER
        },
        lastLogOutDate: {
            type: DataTypes.DATE
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        firstName : {
            type: DataTypes.STRING
        },
        lastName : {
            type: DataTypes.STRING
        },
        address : {
            type: DataTypes.STRING
        },
        telephone : {
            type: DataTypes.STRING
        },
        expiryDate: {
            type: DataTypes.DATE
        }, 
        minLength: {
            type: DataTypes.INTEGER
        }, 
        complexity: {
            type: DataTypes.INTEGER //1: hard, 2: normal, 3: easy
        },
        status: {
            type: DataTypes.INTEGER
        }
    },
    {
        classMethods: {
            associate: function(models) {}
        },
        timestamps: false
    });
    return Users;
}
