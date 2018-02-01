import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class JobGroupService {
    baseUrl = this.appConfig.config.baseJobApiUrl + "/api";

    jobGroupAPI = {
        getAll: this.baseUrl + '/jobGroup/getAll',
        add: this.baseUrl + '/jobGroup',
        update: this.baseUrl + '/jobGroup',
        delete: this.baseUrl + '/jobGroup/@id',
        getById: this.baseUrl + '/jobGroup/getById/@id'
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    public getAll(currentPage: number, pageSize: number, search: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = search;
        return this.tceasHttp.post(this.jobGroupAPI.getAll, JSON.stringify(searchView));
    }

    public getById(id: number): Observable<ApiResponse>{
        return this.tceasHttp.get(this.jobGroupAPI.getById.replace('@id',id.toString()));
    }

    public add(jobGroup: any): Observable<ApiResponse>{
        return this.tceasHttp.post(this.jobGroupAPI.add, JSON.stringify(jobGroup));
    }

    public update(jobGroup: any): Observable<ApiResponse>{
        return this.tceasHttp.put(this.jobGroupAPI.update, JSON.stringify(jobGroup));
    }

    public delete(id: number): Observable<ApiResponse>{
        return this.tceasHttp.delete(this.jobGroupAPI.getById.replace('@id',id.toString()));
    }    
}
