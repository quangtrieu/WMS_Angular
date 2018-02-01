export class AssignTechnicianSearchModel {
    id: number;
    technicianName: string;
    existingTasks: existingTask [];
    selected: boolean;
}

export class AssignTechnicianSearchResultModel {
    count: number;
    rows: AssignTechnicianSearchModel [];
}

export class existingTask {
    repairOrderId: number;
    repairOrderCode: string;
} 