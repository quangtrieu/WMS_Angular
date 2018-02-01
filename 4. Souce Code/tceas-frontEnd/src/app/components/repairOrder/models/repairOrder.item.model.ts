export class RepairOrderItem {
    servicePackageId: number;
    packageCode: string;
    itemDescription: string;
    job: JobItem;
}
export class JobItem {
    repairOrderJobId: number;
    id: number;
    code: string;
    description: string;
    labourCharge: number;
    quantity: number;
    source: number;
    unitPrice: number;
    discount: number;
    goodWillPercent: number;
    goodWillAmt: number;
    discountAmt: number;
    netAmt: number;
    subTotal: number;
    parts: any;
    listPartType: any;
    partTypeId: number;
    servicePackageJobId: number;
    discountPercent: number;
    pdComeBackJobId: number;
    pdPaymentTypeId: number;
    pdJobSourceId: number;
    isDeleted: boolean;
    isGoodWill: boolean;

    listJobType: any;
    listJobSource: any;
    listPaymentType: any;
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