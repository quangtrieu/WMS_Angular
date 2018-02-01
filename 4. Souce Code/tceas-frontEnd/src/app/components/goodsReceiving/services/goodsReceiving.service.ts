import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';
import { SortColumn } from "../../shared/models/sortColumn.model";

@Injectable()
export class GoodsReceivingService {
    private baseUrl = this.appConfig.config.basePartApiUrl + "/api";
    goodsReceivingAPI = {
        getAll: this.baseUrl + '/goodsReceiving/getAll',
        create: this.baseUrl + '/goodsReceiving',
        getListPartByWorkShopId: this.baseUrl + '/goodsReceiving/getListPartByWorkShopId',
        getListBinByWorkShopId: this.baseUrl + '/goodsReceiving/getListBinByWorkShopId',
        delete: this.baseUrl + '/goodsReceiving/@id',
        getCustomer: this.baseUrl + '/goodsReceiving/getById/@id',
    };

    constructor(private tceasHttp: TCEASHttp, private appConfig: AppConfig) { }
    public getListPartByWorkShopId(workShopId: number): Observable<ApiResponse>{
        var obj: any = {}
        obj.workshopId = workShopId;
        return this.tceasHttp.post(this.goodsReceivingAPI.getListPartByWorkShopId, JSON.stringify(obj));
    }

    public create(grn: any): Observable<PutResponse> {
        return this.tceasHttp.post(this.goodsReceivingAPI.create, grn).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getListBinByWorkShopId(workShopId: number): Observable<ApiResponse>{
        var obj: any = {}
        obj.workshopId = workShopId;
        return this.tceasHttp.post(this.goodsReceivingAPI.getListBinByWorkShopId, JSON.stringify(obj));
    }

    public getGRNs(currentPage: number, pageSize: number, invoiceSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = invoiceSearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.goodsReceivingAPI.getAll, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }
}
