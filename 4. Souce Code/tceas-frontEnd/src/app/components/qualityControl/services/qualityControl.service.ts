import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class QuantityControlService {
    baseUrl = this.appConfig.config.baseApiUrl + "/api";
    jobUrl = this.appConfig.config.baseJobApiUrl + "/api";
    quantityControlAPI = {
        getQuantityControls: this.baseUrl + '/quantityControl/getall',
        getTable: this.baseUrl + '/quantity/findInspectionCheckList',
        getOption: this.baseUrl + '/quantity/getPDInspectionValue',
        create: this.baseUrl + '/quantity/create',
        getAll: this.jobUrl + '/quantity/getall',
        getJobFF: this.jobUrl + '/quantity/getJobFF',
        updateJobFFItem: this.baseUrl + '/quantity/updateJobFF',
        chkExistInsQC: this.baseUrl + '/quantity/chkExistInspectionQC',
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    public getQuantityControl(currentPage: number, pageSize: number, quantityControlSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = quantityControlSearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.quantityControlAPI.getQuantityControls, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getAll(currentPage: number, pageSize: number, quantityControlSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = quantityControlSearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.quantityControlAPI.getAll, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getAllTable(): Observable<PutResponse> {
        return this.tceasHttp.get(this.quantityControlAPI.getTable).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getJobFF(id: any): Observable<PutResponse> {
        return this.tceasHttp.post(this.quantityControlAPI.getJobFF, id).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getOption(): Observable<PutResponse> {
        return this.tceasHttp.get(this.quantityControlAPI.getOption).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    create(obj): Observable<PutResponse> {
        return this.tceasHttp.post(this.quantityControlAPI.create, obj).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    updateJobFFItem(obj): Observable<PutResponse> {
        return this.tceasHttp.post(this.quantityControlAPI.updateJobFFItem, obj).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    chkExistInspectionQC(obj): Observable<PutResponse> {
        return this.tceasHttp.post(this.quantityControlAPI.chkExistInsQC, obj).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }
}
