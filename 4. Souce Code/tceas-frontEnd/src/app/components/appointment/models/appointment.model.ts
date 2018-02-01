import { JobPartItem } from './jobPart.item.model';
export class AppointmentModel {
    isUpdate: boolean;
    id: number;
    registrationNo: string;
    vehicleCustomerId: number;
    vehicleModel: string;
    workShopId: any;
    vehicleVariantId: number;
    vinNo: string;
    engineNo: string;
    chassisNo: string;
    timeSlotDetail: TimeSlotDetailModel;
    customerName: string;
    idNo: string;
    mobilePhoneNo: string;
    serviceAdvisorId: number;
    remarks: string;
    currentMilleage: any;
    RepairOrderJobs: any;
    VehicleCustomer: any;
    jobGroupId: any;
    pdJobTypeId: any;
    packageTypeId: any;
    servicePackageId: any;
    servicePackage: any;
    jobId: any;
    partId: any;
    jobItem: any;
    partItem: any;
    totalPartAmt: number;
    totalLabourCharge: number;
    jobParts: JobPartItem[];
    jobs: any[];
    quantity: any;
    Qty: any;
    partSourceId: any;
    timeSlotDate: any;
}

export class TimeSlotDetailModel {
    id: number;
    timeSlotDate: string;
    timeSlotTime: string;
    workShopId: any;
}