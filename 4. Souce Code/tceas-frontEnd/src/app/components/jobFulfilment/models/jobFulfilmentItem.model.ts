import { JobAssignedTechnicianModel } from "./jobAssignedTechnician.model";
import { JobTrackingModel } from "./jobTracking.model";

export class JobFulfilmentItemModel {
    id: number;
    jobFulfilmentId: number;
    bayId: number;
    repairOrderJobId: number;
    estimatedStartTime: string;
    estimatedEndTime: string;
    jobFulfilmentItemStatusId: number;
    jobAssignedTechnicians: JobAssignedTechnicianModel [];
    jobTrackings: JobTrackingModel [];
    jobCode: string;
    jobTrackingLastStatusId: number;
}
