"use strict";

module.exports = function (sequelize, DataTypes) {
    var AppointmentJob = sequelize.define('AppointmentJob', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        appointmentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        servicePackageId: {
            type: DataTypes.INTEGER
        },
        jobId: {
            type: DataTypes.INTEGER
        },
        pdComeBackJobId: {
            type: DataTypes.INTEGER
        },
        pdPaymentTypeId: {
            type: DataTypes.INTEGER
        },
        pdJobSourceId: {
            type: DataTypes.INTEGER
        },
        pdJobStatusId: {
            type: DataTypes.INTEGER
        },
        flatRate: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        labourCharge: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        discountPercent: {
            type: DataTypes.DECIMAL(18, 2)
        },
        subTotal: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        goodWillPercent: {
            type: DataTypes.DECIMAL(18, 2)
        },
        goodWillAmt: {
            type: DataTypes.DECIMAL(18, 2)
        },
        netAmt: {
            type: DataTypes.DECIMAL(18, 2)
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    AppointmentJob.belongsTo(models.Appointment, { foreignKey: 'appointmentId', targetKey: 'id' });
                    AppointmentJob.belongsTo(models.JobMaster, { foreignKey: 'jobId', sourceKey: 'id' });
                    AppointmentJob.belongsTo(models.PDComeBackJob, { foreignKey: 'pdComeBackJobId', sourceKey: 'id' });
                    AppointmentJob.belongsTo(models.PDJobStatus, { foreignKey: 'pdJobStatusId', sourceKey: 'id' });
                    AppointmentJob.belongsTo(models.PDPaymentType, { foreignKey: 'pdPaymentTypeId', sourceKey: 'id' });
                    AppointmentJob.belongsTo(models.PDJobSource, { foreignKey: 'pdJobSourceId', sourceKey: 'id' });
                    AppointmentJob.belongsTo(models.ServicePackageMaster, { foreignKey: 'servicePackageId', targetKey: 'id' });
                }
            },
            timestamps: false
        });
    return AppointmentJob;
}
