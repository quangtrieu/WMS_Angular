import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';
import { JobFulfilmentSearchModel, JobFulfilmentSearchResultModel } from "../models/jobFulfilmentSearch.model";
import { JobFulfilmentStatusEnum } from "../../../commons/enums/jobFulfilmentStatusEnum";
import { Utils } from "../../../commons/app.utils";
import { JobFulfilmentModel } from "../models/jobFulfilment.model";
import { JobFulfilmentItemModel } from "../models/jobFulfilmentItem.model";
import { JobAssignedTechnicianModel } from "../models/jobAssignedTechnician.model";
import { JobTrackingModel } from "../models/jobTracking.model";
import { JobTrackingStatusEnum } from "../../../commons/enums/jobTrackingStatusEnum";
import { AssignTechnicianSearchResultModel, AssignTechnicianSearchModel } from "../models/assignTechnicianSearch.model";

@Injectable()
export class JobFulfilmentService {
    baseUrl = this.appConfig.config.baseJobApiUrl + "/api";
    jobFulfilmentAPI = {
        getAll: this.baseUrl + '/jobFulfilment/getAll',
        getById: this.baseUrl + '/jobFulfilment/getById/@id',
        update: this.baseUrl + '/jobFulfilment/update',
        getAssignTechnicians: this.baseUrl + '/jobFulfilment/getAssignTechnicians',
        initJobFulfilment: this.baseUrl + '/jobFulfilment/initJobFulfilment'
    };

    constructor(public tceasHttp: TCEASHttp,
        private appConfig: AppConfig,
        private utils: Utils) {
    }

    public getAll(currentPage: number, pageSize: number, search: any): Promise<JobFulfilmentSearchResultModel> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = search;
        return this.tceasHttp.post(this.jobFulfilmentAPI.getAll, JSON.stringify(searchView)).toPromise().then(res => {
            if (!res.success) return null;
            var searchResult = new JobFulfilmentSearchResultModel();
            searchResult.count = res.data.count;
            searchResult.rows = [];
            res.data.rows.forEach(row => {
                var item = new JobFulfilmentSearchModel();
                item.id = row.id;
                item.roNumber = row.RepairOrderMaster.code;
                item.roDate = row.RepairOrderMaster.createdDateTime;
                item.status = this.utils.getEnum(JobFulfilmentStatusEnum.Items, row.jobFulfilmentStatusId).description;
                item.modelVariant = row.RepairOrderMaster.VehicleCustomer.Vehicle.VehicleVariant.description;
                item.registrationNo = row.RepairOrderMaster.VehicleCustomer.registrationNo;
                item.jobs = row.RepairOrderMaster.RepairOrderJobs.map(j => j.JobMaster ? j.JobMaster.description : "").join(', ');
                searchResult.rows.push(item);
            });
            return searchResult;
        });
    }

    public getById(id: number): Promise<JobFulfilmentModel> {
        return this.tceasHttp.get(this.jobFulfilmentAPI.getById.replace('@id', id.toString())).toPromise().then(res => {
            if (!res.success) return null;
            var data = res.data;
            var jobFulfilment = new JobFulfilmentModel();
            jobFulfilment.id = data.id;
            jobFulfilment.roNumber = data.RepairOrderMaster.code;
            jobFulfilment.roDate = data.RepairOrderMaster.createdDateTime;
            jobFulfilment.repairOrderId = data.repairOrderId;
            jobFulfilment.serviceAdvisorId = data.serviceAdvisorId;
            jobFulfilment.estimatedDeliveryTime = data.RepairOrderMaster.expectedDeliveryDateTime;
            jobFulfilment.jobFulfilmentStatusName = this.utils.getEnum(JobFulfilmentStatusEnum.Items, data.jobFulfilmentStatusId).description;
            jobFulfilment.jobFulfilmentStatusId = data.jobFulfilmentStatusId;
            jobFulfilment.registrationNo = data.RepairOrderMaster.VehicleCustomer.registrationNo;
            if (data.ServiceAdvisor)
                jobFulfilment.serviceAdvisorName = data.ServiceAdvisor.name;

            if (data.Bay) {
                jobFulfilment.suggestedBayId = data.Bay.id;
                jobFulfilment.suggestedBayName = data.Bay.code;
            }
            var jobFulfilmentItems = data.JobFulfilmentItems.filter(i=>i!=null);
            jobFulfilment.jobFulfilmentItems = [];
            if (jobFulfilmentItems) {
                jobFulfilmentItems.forEach(item => {
                    var jobFulfilmentItem = new JobFulfilmentItemModel();
                    jobFulfilmentItem.id = item.id;
                    jobFulfilmentItem.repairOrderJobId = item.repairOrderJobId;
                    jobFulfilmentItem.bayId = item.bayId;
                    jobFulfilmentItem.estimatedStartTime = this.utils.displayDateTimeControl(item.estimatedStartTime);
                    jobFulfilmentItem.estimatedEndTime = this.utils.displayDateTimeControl(item.estimatedEndTime);
                    jobFulfilmentItem.jobFulfilmentItemStatusId = item.jobFulfilmentItemStatusId;
                    if (item.JobMaster) {
                        jobFulfilmentItem.jobCode = item.JobMaster.code + ' - ' + item.JobMaster.description;
                    }
                    jobFulfilmentItem.jobAssignedTechnicians = [];
                    if (item.JobAssignedTechnicians) {
                        item.JobAssignedTechnicians.forEach(el => {
                            var jobAssignedTechnician = new JobAssignedTechnicianModel();
                            if (!el.isDeleted) {
                                jobAssignedTechnician.id = el.id;
                                jobAssignedTechnician.employeeId = el.employeeId;
                                jobAssignedTechnician.employeeName = el.Employee.name;
                                jobAssignedTechnician.repairOrderId = el.repairOrderId;
                                jobFulfilmentItem.jobAssignedTechnicians.push(jobAssignedTechnician);
                            }
                        });
                    }
                    jobFulfilmentItem.jobTrackings = [];
                    if (item.JobTrackings) {
                        item.JobTrackings.forEach(el => {
                            var jobTracking = new JobTrackingModel();
                            jobTracking.id = el.id;
                            jobTracking.jobFulfilmentItemId = el.jobFulfilmentItemId;
                            jobTracking.startTime = el.startTime;
                            jobTracking.endTime = el.endTime;
                            jobTracking.jobTrackingStatusId = el.jobTrackingStatusId;
                            jobTracking.jobTrackingStatusName = this.utils.getEnum(JobTrackingStatusEnum.Items, el.jobTrackingStatusId).description;
                            jobFulfilmentItem.jobTrackings.push(jobTracking);
                        });
                    }
                    // Sort by EndTime DESC
                    jobFulfilmentItem.jobTrackings.sort((a, b) => {
                        var v1 = a.endTime ? new Date(a.endTime).getTime() : 0;
                        var v2 = b.endTime ? new Date(b.endTime).getTime() : 0;
                        return v2 - v1;
                    });
                    if (jobFulfilmentItem.jobTrackings.length > 0)
                        jobFulfilmentItem.jobTrackingLastStatusId = jobFulfilmentItem.jobTrackings[jobFulfilmentItem.jobTrackings.length - 1].jobTrackingStatusId;

                    jobFulfilment.jobFulfilmentItems.push(jobFulfilmentItem);
                });
            }
            return jobFulfilment;
        });
    }

    public update(jobFulfilment: JobFulfilmentModel): Promise<boolean> {
        return this.tceasHttp.put(this.jobFulfilmentAPI.update, JSON.stringify(jobFulfilment)).toPromise().then(res => {
            return res.success;
        });
    }

    public getAssignTechnicians(currentPage: number, pageSize: number, search: any): Promise<AssignTechnicianSearchResultModel> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = search;
        return this.tceasHttp.post(this.jobFulfilmentAPI.getAssignTechnicians, JSON.stringify(searchView)).toPromise().then(res => {
            if (!res.success) return null;
            var searchResult = new AssignTechnicianSearchResultModel();
            searchResult.count = res.data.count;
            searchResult.rows = [];
            res.data.rows.forEach(row => {
                var item = new AssignTechnicianSearchModel();
                item.id = row.id;
                item.technicianName = row.technicianName;
                item.existingTasks = row.existingTasks;
                searchResult.rows.push(item);
            });
            return searchResult;
        });
    }

    public initJobFulfilment(jobFulfilment: JobFulfilmentModel): Promise<JobFulfilmentModel> {
        return this.tceasHttp.post(this.jobFulfilmentAPI.initJobFulfilment, JSON.stringify(jobFulfilment)).toPromise().then(res => {
            return res.data as JobFulfilmentModel;
        });
    }
}
