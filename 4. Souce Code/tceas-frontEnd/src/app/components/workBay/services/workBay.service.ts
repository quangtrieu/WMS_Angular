import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class WorkBayService {
    baseUrl = this.appConfig.config.baseApiUrl + "/api";
    workBayAPI = {
        getworkBays: this.baseUrl + '/workBay/getAll',
        getHoist: this.baseUrl + '/workBay/getHoist',
        getBayType: this.baseUrl + '/workBay/getBayType',
        getEmployee: this.baseUrl + '/workBay/getEmployee',
        getById: this.baseUrl + '/workBay/getById/@id',
        addNew: this.baseUrl + '/workBay',
        update: this.baseUrl + '/workBay',
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    public getworkBays(currentPage: number, pageSize: number, workBaySearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = workBaySearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.workBayAPI.getworkBays, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getHoist(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.workBayAPI.getHoist).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getBayType(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.workBayAPI.getBayType).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getEmployee(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.workBayAPI.getEmployee).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getById(id: number): Observable<ApiResponse> {
        return this.tceasHttp.get(this.workBayAPI.getById.replace('@id', id.toString())).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }
   
    public add(make: any): Observable<PutResponse> {
        return this.tceasHttp.post(this.workBayAPI.addNew, make).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public update(make: any): Observable<PutResponse> {
        return this.tceasHttp.put(this.workBayAPI.update, make).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

}
