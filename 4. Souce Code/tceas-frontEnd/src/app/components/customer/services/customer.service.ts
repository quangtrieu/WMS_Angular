import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';
import { SortColumn } from "../../shared/models/sortColumn.model";

@Injectable()
export class CustomerService {
    private baseUrl = this.appConfig.config.baseApiUrl + "/api";
    customerAPI = {
        getAll: this.baseUrl + '/customer/getAll',
        getPD: this.baseUrl + '/customer/getPDData',
        update: this.baseUrl + '/customer',
        delete: this.baseUrl + '/customer/@id',
        getCustomer: this.baseUrl + '/customer/getById/@id',
    };

    constructor(private tceasHttp: TCEASHttp, private appConfig: AppConfig) { }

    // public getAll(searchViewModel: any, sortColumn: any, currentPage: number, pageSize: number): Observable<ApiResponse> {
                
    //     var searchView = new SearchViewModel();
    //     searchView.currentPage = currentPage;
    //     searchView.pageSize = pageSize;
    //     searchView.data = searchViewModel;
    //     searchView.sortColumn = sortColumn;

    //     return this.tceasHttp.post(this.customerAPI.getAll, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
    //         return Observable.timer(1000);
    //     }));
    // }

    public getAll(currentPage: number, pageSize: number, customerSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = customerSearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.customerAPI.getAll, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getPDData(): Observable<ApiResponse> {
        let url = this.customerAPI.getPD;

        return this.tceasHttp.get(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getCustomer(id: number): Observable<ApiResponse> {
        let url = this.customerAPI.getCustomer.replace('@id', id + "");

        return this.tceasHttp.get(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    addCustomer(customer: any): Observable<ApiResponse> {
        return this.tceasHttp.post(this.customerAPI.update, customer).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    updateCustomer(customer: any): Observable<ApiResponse> {
        return this.tceasHttp.put(this.customerAPI.update, JSON.stringify(customer)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    deleteCustomer(id: string): Observable<ApiResponse> {
        let url = this.customerAPI.delete.replace('@id', id);

        return this.tceasHttp.delete(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }
}
