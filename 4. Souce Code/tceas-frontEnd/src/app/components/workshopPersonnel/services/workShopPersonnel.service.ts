import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class WorkShopPersonnelService {
    baseUrl = this.appConfig.config.baseApiUrl + "/api";
    workShopPersonnelAPI = {
        getworkShopPersonnels: this.baseUrl + '/workPersonnel/getAll',
        getById: this.baseUrl + '/workPersonnel/getById/@id',
        getRole: this.baseUrl + '/workPersonnel/getRole',
        add: this.baseUrl + '/workPersonnel',
        update: this.baseUrl + '/workPersonnel/update',
        // delete: this.baseUrl + '/workShopPersonnel/@id',
        // getModelByMakeId: this.baseUrl + '/workShopPersonnel/getModels/@id',
        // checkExistCode: this.baseUrl + '/workShopPersonnel/checkExistCode'
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    public getworkShopPersonnels(currentPage: number, pageSize: number, workShopPersonnelSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = workShopPersonnelSearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.workShopPersonnelAPI.getworkShopPersonnels, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getById(id: number): Observable<ApiResponse> {
        return this.tceasHttp.get(this.workShopPersonnelAPI.getById.replace('@id', id.toString())).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getRole(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.workShopPersonnelAPI.getRole).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public update(obj): Observable<ApiResponse> {
        return this.tceasHttp.put(this.workShopPersonnelAPI.update, obj).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public create(obj): Observable<ApiResponse> {
        return this.tceasHttp.post(this.workShopPersonnelAPI.add, obj).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

}
