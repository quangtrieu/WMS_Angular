
import {CustomerDummyData} from './customer.dummydata'
import {VehicleDummyData} from './vehicle.dummydata'

export class RepairOrderDummyData{
    repairOrderNo: string;
    customer: CustomerDummyData;
    vehicle: VehicleDummyData;
    dateTimeIn: string;
    status: string;
    appointmentNo: string;
    appointmentDate: string;
    invoiceNo: string;
    invoiceDate: string;
    createdBy: string;
    modifiedBy: string;
    modifiedDateTime: string;
    expectedDeliveryDateTime: string;
    constructor(init?:Partial<RepairOrderDummyData>) {
        Object.assign(this, init);
    }
}