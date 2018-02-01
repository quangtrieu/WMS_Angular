"use strict";

module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define('Customer', {
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
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        idNumber: {
            type: DataTypes.TEXT,
        },
        contact: {
            type: DataTypes.TEXT,
        },
        customerType: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pdCountryId: {
            type: DataTypes.INTEGER,
        },
        pdIdTypeId: {
            type: DataTypes.INTEGER
        },
        gender: {
            type: DataTypes.INTEGER
        },
        pdRaceId: {
            type: DataTypes.INTEGER
        },
        pdSalutationId: {
            type: DataTypes.INTEGER
        },
        pdOccupationId: {
            type: DataTypes.INTEGER
        },
        pdEmploymentStatusId: {
            type: DataTypes.INTEGER
        },
        houseTelNo: {
            type: DataTypes.TEXT
        },
        officeTelNo: {
            type: DataTypes.TEXT
        },
        extension: {
            type: DataTypes.TEXT
        },
        faxNumber: {
            type: DataTypes.TEXT
        },
        email: {
            type: DataTypes.STRING(100),
            validate: {
                isEmail: true
            }
        },
        firstlanguageId: {
            type: DataTypes.INTEGER,
        },
        secondLanguageId: {
            type: DataTypes.INTEGER,
        },
        receiveVehicleCollectionSMS: {
            type: DataTypes.INTEGER
        },
        receiveVehicleReminderSMS: {
            type: DataTypes.INTEGER
        },
        receiveCampainSMS: {
            type: DataTypes.INTEGER
        },
        receiveProductInformation: {
            type: DataTypes.INTEGER
        },
        firstContactPreference: {
            type: DataTypes.INTEGER
        },
        secondContactPreference: {
            type: DataTypes.INTEGER
        },
        address: {
            type: DataTypes.STRING(300)
        },
        addressCountry: {
            type: DataTypes.TEXT,
        },
        addressState: {
            type: DataTypes.TEXT
        },
        addressCity: {
            type: DataTypes.TEXT
        },
        addressPostalCode: {
            type: DataTypes.TEXT
        },
        addressBilling: {
            type: DataTypes.TEXT
        },
        addressBillingCountry: {
            type: DataTypes.TEXT
        },
        addressBillingState: {
            type: DataTypes.TEXT
        },
        addressBillingCity: {
            type: DataTypes.TEXT
        },
        addressBillingPostalCode: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.BOOLEAN
        },
        createdDateTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedDateTime: {
            type: DataTypes.DATE
        },
        createdBy: {
            type: DataTypes.STRING
        },
        modifiedBy: {
            type: DataTypes.STRING
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    Customer.hasMany(models.VehicleCustomer, { foreignKey: 'customerId', sourceKey: 'id' });
                    Customer.belongsTo(models.PDLanguage, { foreignKey: 'firstlanguageId', targetKey: 'id' });
                    Customer.belongsTo(models.PDLanguage, { foreignKey: 'secondLanguageId', targetKey: 'id' });
                    Customer.belongsTo(models.PDCountry, { foreignKey: 'pdCountryId', targetKey: 'id' });
                    Customer.belongsTo(models.PDIdType, { foreignKey: 'pdIdTypeId', targetKey: 'id' });
                    Customer.belongsTo(models.PDSalutation, { foreignKey: 'pdSalutationId', targetKey: 'id' });
                    Customer.belongsTo(models.PDOccupation, { foreignKey: 'pdOccupationId', targetKey: 'id' });
                    Customer.belongsTo(models.PDEmployeeStatus, { foreignKey: 'pdEmploymentStatusId', targetKey: 'id' });
                    Customer.belongsTo(models.PDRace, { foreignKey: 'pdRaceId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return Customer;
}
