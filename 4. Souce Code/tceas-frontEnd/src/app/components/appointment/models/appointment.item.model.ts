export class AppointmentItem {
    servicePackageId: number;
    packageCode: string;
    itemDescription: string;
    job: JobItem;
    listJobType: any;
    listJobSource: any;
    listPaymentType: any;
}
export class JobItem {
    id: number;
    code: string;
    description: string;
    labourCharge: number;
    quantity: number;
    source: number;
    unitPrice: number;
    discount: number;
    goodWill: number;
    subTotal: number;
    parts: any;
    listPartType: any;
    partTypeId: number;
    servicePackageJobId: number;
    discountPercent: number;
    pdComeBackJobId: number;
    pdPaymentTypeId: number;
    pdJobSourceId: number;
    appointmentJobId: number;
}

export class PartItem {
    id: number;
    code: string;
    description: string;
    jobTypeId: number;
    paymentCash: number;
    quantity: number;
    source: number;
    unitPrice: number;
    discount: number;
    goodWill: number;
    subTotal: number;
}