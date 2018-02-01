import { JobFulfilmentItemModel } from "./jobFulfilmentItem.model";

export class JobFulfilmentModel {
    id: number;
    roNumber: string;
    roDate: string;
    repairOrderId: number;
    jobFulfilmentStatusName: string;
    jobFulfilmentStatusId: number;
    registrationNo: string;
    customer: string;
    suggestedBayName: string;
    suggestedBayId: number;
    serviceAdvisorId: number;
    serviceAdvisorName: string;
    estimatedDeliveryTime: Date;
    jobFulfilmentItems: JobFulfilmentItemModel [];
}