import { CustomerDummyData } from './customer.dummydata'
import { VehicleDummyData } from './vehicle.dummydata'
import { RepairOrderDummyData } from './repairOrder.dummydata'

export class DummyData {
    currentDate: Date = new Date();

    customer: CustomerDummyData = new CustomerDummyData({
        id: "1",
        customerName: "VINH NC",
        address: "Ha Noi - Viet Nam",
        customerIdType: "PASSPORT NO",
        customerType: "INDIVIDUAL",
        idNo: "B1234567",
        mobilePhone: "0121234567"
    });

    vehicle: VehicleDummyData = new VehicleDummyData({
        id: "1",
        vehicleRegistrationNo: "29B1-373.20",
        registrationDate: "05-07-2017",
        purchaseDate: "01-07-2017",
        vehicleMake: "NISSAN",
        verhicleModel: "X-TRAIL",
        modelVariant: "X-TRAIL 2.0L 4WD (A)",
        chassisNo: "ABCD1234",
        engineNo: "ABCD1234",
        warrantyPeriod: "0",
        warrantyMileages: "100000",
        vinNo: "19UYA31581L"
    });

    repairOrder: RepairOrderDummyData = new RepairOrderDummyData({
        customer: this.customer,
        vehicle: this.vehicle,
        dateTimeIn: this.currentDate.getFullYear() + '-' +
        (this.currentDate.getMonth() + 1 < 10 ? +'0' : '') + (this.currentDate.getMonth() + 1) + '-' +
        (this.currentDate.getDay() < 10 ? +'0' : '') + this.currentDate.getDate() + 'T' +
        (this.currentDate.getHours() < 10 ? '0' : '') + this.currentDate.getHours() + ':' +
        (this.currentDate.getMinutes() < 10 ? '0' : '') + this.currentDate.getMinutes()
    });

    repairOrderList: Array<RepairOrderDummyData> = [
        new RepairOrderDummyData({
            repairOrderNo: 'PJY-N229609',
            customer: new CustomerDummyData({
                id: "1",
                customerName: "VINH NC",
                address: "Ha Noi - Viet Nam",
                customerIdType: "PASSPORT NO",
                customerType: "INDIVIDUAL",
                idNo: "B1234567",
                mobilePhone: "0121234567"
            }),
            vehicle: new VehicleDummyData({
                id: "1",
                vehicleRegistrationNo: "29B1-373.20",
                registrationDate: "05-07-2017",
                purchaseDate: "01-07-2017",
                vehicleMake: "NISSAN",
                verhicleModel: "X-TRAIL",
                modelVariant: "X-TRAIL 2.0L 4WD (A)",
                chassisNo: "ABCD1234",
                engineNo: "ABCD1234",
                warrantyPeriod: "0",
                warrantyMileages: "100000",
                vinNo: "19UYA31581L"
            }),
            status: 'NEW',
            dateTimeIn: '2017-06-29T10:20',
            expectedDeliveryDateTime: '2017-07-01T08:00',
            createdBy: "Admin",
            modifiedBy: "Admin",
            modifiedDateTime: "2017-07-01T08:00",
        }),

        new RepairOrderDummyData({
            repairOrderNo: 'PJY-N229160',
            customer: new CustomerDummyData({
                id: "1",
                customerName: "YEO FirstName",
                address: "KUALA LUMPUR",
                customerIdType: "PASSPORT NO",
                customerType: "INDIVIDUAL",
                idNo: "B1234567",
                mobilePhone: "0121234567"
            }),
            vehicle: new VehicleDummyData({
                id: "1",
                vehicleRegistrationNo: "33B1-91.27",
                registrationDate: "05-07-2017",
                purchaseDate: "01-07-2017",
                vehicleMake: "NISSAN",
                verhicleModel: "SENTRA",
                modelVariant: "SENTRA, N16 1.6L (A)",
                chassisNo: "PN8CFAN16TCC24103",
                engineNo: "QG16C033756",
                warrantyPeriod: "0",
                warrantyMileages: "100000",
                vinNo: "19UYA31581L"
            }),
            status: 'NEW',
            dateTimeIn: '2017-06-29T10:20',
            expectedDeliveryDateTime: '2017-07-01T08:00',
            createdBy: "Admin",
            modifiedBy: "Admin",
            modifiedDateTime: "2017-07-01T08:00",
        }),

        new RepairOrderDummyData({
            repairOrderNo: 'PJY-N229601',
            customer: new CustomerDummyData({
                id: "1",
                customerName: "NAM HOANG",
                address: "Ha Noi - Vietname",
                customerIdType: "PASSPORT NO",
                customerType: "INDIVIDUAL",
                idNo: "B1234567",
                mobilePhone: "0121234567"
            }),
            vehicle: new VehicleDummyData({
                id: "1",
                vehicleRegistrationNo: "29N1-100.01",
                registrationDate: "05-07-2017",
                purchaseDate: "01-07-2017",
                vehicleMake: "NISSAN",
                verhicleModel: "SENTRA",
                modelVariant: "SENTRA, N16 1.6L (A)",
                chassisNo: "PN8CFAN16TCC24103",
                engineNo: "QG16C033756",
                warrantyPeriod: "0",
                warrantyMileages: "100000",
                vinNo: "19UYA31581L"
            }),
            invoiceDate: "2017-07-01",
            invoiceNo: "IV10001",
            status: 'CLOSED',
            dateTimeIn: '2017-06-29T10:20',
            expectedDeliveryDateTime: '2017-07-01T08:00',
            createdBy: "Admin",
            modifiedBy: "Admin",
            modifiedDateTime: "2017-07-01T08:00",
        }),

        new RepairOrderDummyData({
            repairOrderNo: 'PJY-N227687',
            customer: new CustomerDummyData({
                id: "1",
                customerName: "S.SIVALINGAM FirstName",
                address: "PETALING JAYA",
                customerIdType: "PASSPORT NO",
                customerType: "INDIVIDUAL",
                idNo: "B1234567",
                mobilePhone: "0121234567"
            }),
            vehicle: new VehicleDummyData({
                id: "1",
                vehicleRegistrationNo: "WQX9971",
                registrationDate: "05-07-2017",
                purchaseDate: "01-07-2017",
                vehicleMake: "NISSAN",
                verhicleModel: "FRONTIER",
                modelVariant: "FRONTIER PICKUP 4WD 2.5L (D)",
                chassisNo: "PN8CFAN16TCC24103",
                engineNo: "YD25244380A",
                warrantyPeriod: "0",
                warrantyMileages: "100000",
                vinNo: "19UYA31581L"
            }),
            invoiceDate: "2017-07-01",
            invoiceNo: "IV10002",
            status: 'CLOSED',
            dateTimeIn: '2017-06-29T10:20',
            expectedDeliveryDateTime: '2017-07-01T08:00',
            createdBy: "Admin",
            modifiedBy: "Admin",
            modifiedDateTime: "2017-07-01T08:00",
            appointmentDate:'2017-06-29T10:20',
            appointmentNo: "APP00001"
        }),
    ]

}