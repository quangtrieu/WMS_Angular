export class JobFulfilmentSearchModel {
    id: number;
    roNumber: string;
    roDate: string;
    status: string;
    registrationNo: string;
    modelVariant: string;
    jobs: string;
    modifiedBy: string;
    modifiedDateTime: Date;
}

export class JobFulfilmentSearchResultModel {
    count: number;
    rows: JobFulfilmentSearchModel [];
}