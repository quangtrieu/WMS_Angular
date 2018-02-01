import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class InvoiceService {
    baseUrl = this.appConfig.config.baseRepairOrderApiUrl + "/api";
    invoiceAPI = {
        getInvoices: this.baseUrl + '/invoice/getAll',
        addNew: this.baseUrl + '/invoice',
        update: this.baseUrl + '/invoice',
        delete: this.baseUrl + '/invoice/@id',
        getInvoiceById: this.baseUrl + '/invoice/getInvoiceById',
        filterInvoices: this.baseUrl + '/invoice/filter',
        getROById: this.baseUrl + '/invoice/getROById',
        create: this.baseUrl + '/invoice',
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    public getInvoices(currentPage: number, pageSize: number, invoiceSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = invoiceSearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.invoiceAPI.getInvoices, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getInvoiceById(id: any): Observable<ApiResponse> {
        return this.tceasHttp.post(this.invoiceAPI.getInvoiceById, id).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public create(obj: any): Observable<ApiResponse> {
        return this.tceasHttp.post(this.invoiceAPI.create, obj).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getROById(id: any): Observable<ApiResponse> {
        return this.tceasHttp.post(this.invoiceAPI.getROById, id).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

}
