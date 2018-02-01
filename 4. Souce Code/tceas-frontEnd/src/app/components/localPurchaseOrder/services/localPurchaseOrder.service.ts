import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class LocalPurchaseOrderService {
    baseUrl = this.appConfig.config.baseRepairOrderApiUrl + "/api";
    localPOAPI = {
        getById: this.baseUrl + '/localPO/getById/@id',
        getLocalPOs: this.baseUrl + '/localPO/getAll',
        getROBySublet: this.baseUrl + '/localPO/getROBySublet?code=@code',
        getSubletByPartJob: this.baseUrl + '/localPO/getAllSubletByPartJob',
        getPDData: this.baseUrl + '/localPO/getPDData',
        updateLPO: this.baseUrl + '/localPO',
        filterROs: this.baseUrl + '/localPO/filter',
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    public getLocalPOs(currentPage: number, pageSize: number, invoiceSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = invoiceSearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.localPOAPI.getLocalPOs, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getPDData(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.localPOAPI.getPDData).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getROBySublet(code): Observable<ApiResponse> {
        let url = this.localPOAPI.getROBySublet.replace('@code', code + "");

        return this.tceasHttp.get(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getSubletListByPartJob(partIds, jobIds): Observable<ApiResponse> {
        let subletInfo: any = {};
        subletInfo.partIds = partIds;
        subletInfo.jobIds = jobIds;

        return this.tceasHttp.post(this.localPOAPI.getSubletByPartJob, JSON.stringify(subletInfo)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public updateLPO(lPO): Observable<ApiResponse> {
        return this.tceasHttp.post(this.localPOAPI.updateLPO, JSON.stringify(lPO)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getById(id): Observable<ApiResponse> {
        let url = this.localPOAPI.getById.replace('@id', id + "");
        return this.tceasHttp.get(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public filterROs(currentPage: number, pageSize: number, roCode: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = roCode;

        return this.tceasHttp.post(this.localPOAPI.filterROs, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

}
