import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class JobCodeService {
    baseUrl = this.appConfig.config.baseJobApiUrl + "/api";
    jobCodeAPI = {
        getAll: this.baseUrl + '/jobMaster/getAll',
        getListJobByJobGroupId: this.baseUrl + '/jobMaster/getListJobByJobGroupId/@jobGroupId/@vehicleVariantId',
        getAllJobType: this.baseUrl + '/jobMaster/getAllJobType',
        add: this.baseUrl + '/jobMaster',
        update: this.baseUrl + '/jobMaster',
        delete: this.baseUrl + '/jobMaster/@id',
        getById: this.baseUrl + '/jobMaster/getById/@id',
        getJobsByRepairOrderId: this.baseUrl + '/jobMaster/getJobsByRepairOrderId/@id'
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    public getAll(currentPage: number, pageSize: number, search: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = search;
        return this.tceasHttp.post(this.jobCodeAPI.getAll, JSON.stringify(searchView));
    }

    getAllJobType(): Observable<ApiModelResponse> {
        return this.tceasHttp.get(this.jobCodeAPI.getAllJobType).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getListJobByJobGroupId(jobGroupId: number, vehicleVariantId: number): Observable<ApiResponse> {
        var url = this.jobCodeAPI.getListJobByJobGroupId.replace('@jobGroupId', (jobGroupId == null) ? null : jobGroupId.toString());
        url = url.replace('@vehicleVariantId', vehicleVariantId.toString());

        return this.tceasHttp.get(url);
    }

    public getById(id: number): Observable<ApiResponse> {
        return this.tceasHttp.get(this.jobCodeAPI.getById.replace('@id', id.toString()));
    }

    public add(jobCode: any): Observable<ApiResponse> {
        return this.tceasHttp.post(this.jobCodeAPI.add, JSON.stringify(jobCode));
    }

    public update(jobCode: any): Observable<ApiResponse> {
        return this.tceasHttp.put(this.jobCodeAPI.update, JSON.stringify(jobCode));
    }

    public delete(id: number): Observable<ApiResponse> {
        return this.tceasHttp.delete(this.jobCodeAPI.getById.replace('@id', id.toString()));
    }
}
