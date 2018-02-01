import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';
import { SortColumn } from "../../shared/models/sortColumn.model";
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';

@Injectable()
export class PartFulfillmentService {
    private baseUrl = this.appConfig.config.baseRepairOrderApiUrl + "/api";
    private partUrl = this.appConfig.config.basePartApiUrl + "/api";
    repairOrderPartAPI = {
        getAll: this.baseUrl + '/repairOrderPart/getAll',
        update: this.baseUrl + '/repairOrderPart',
        getByROId: this.baseUrl + '/repairOrderPart/getByROId?roId=@id',
        getPartSubstitutes: this.partUrl + '/partMaster/getPartSubstitute',
        getPartInfomation: this.partUrl + '/fulfillment/getFulfillment',
        updatePartFulfill: this.partUrl + '/fulfillment',
        confirmPicking: this.partUrl + '/fulfillment/confirmPicking?roId=@id'
    };

    constructor(private tceasHttp: TCEASHttp, private appConfig: AppConfig) { }

    public getAll(currentPage: number, pageSize: number, searchViewModel: any, sortColumn: any): Observable<ApiResponse> {
                
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = searchViewModel;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.repairOrderPartAPI.getAll, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getByROId(id: number): Observable<ApiResponse> {
        let url = this.repairOrderPartAPI.getByROId.replace('@id', id + "");

        return this.tceasHttp.get(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getPartSubstitutes(partInfo: any): Observable<ApiResponse> {        
        return this.tceasHttp.post(this.repairOrderPartAPI.getPartSubstitutes, JSON.stringify(partInfo)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getPartInfomation(partInfo: any): Observable<ApiResponse> {        
        return this.tceasHttp.post(this.repairOrderPartAPI.getPartInfomation, JSON.stringify(partInfo)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public updatePartFulfill(partInfo: any): Observable<ApiResponse> {        
        return this.tceasHttp.post(this.repairOrderPartAPI.updatePartFulfill, JSON.stringify(partInfo)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public confirmPicking(roId: any): Observable<ApiResponse> {
        let url = this.repairOrderPartAPI.confirmPicking.replace('@id', roId + "");

        return this.tceasHttp.get(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }
}
