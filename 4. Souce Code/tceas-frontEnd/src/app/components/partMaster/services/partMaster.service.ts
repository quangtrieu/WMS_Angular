import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class PartMasterService {
    baseUrl = this.appConfig.config.basePartApiUrl + "/api";
    partMasterAPI = {
        getPartMasters: this.baseUrl + '/partMaster/getall',
        getById: this.baseUrl + '/partMaster/getById/@id',
        getListPartByWorkShopId: this.baseUrl + '/partMaster/getListPartByWorkShopId/@workShopId/@vehicleVariantId',
        addNew: this.baseUrl + '/partMaster',
        update: this.baseUrl + '/partMaster',
        delete: this.baseUrl + '/partMaster/@id'
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    public getPartMaster(currentPage: number, pageSize: number, partMasterSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = partMasterSearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.partMasterAPI.getPartMasters, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }
  
    public getListPartByWorkShopId(workShopId: number, vehicleVariantId: number) {
        var url = this.partMasterAPI.getListPartByWorkShopId.replace('@workShopId', workShopId.toString());
        url = url.replace('@vehicleVariantId', vehicleVariantId.toString());

        return this.tceasHttp.get(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getById(id: number): Observable<ApiModelResponse> {
        return this.tceasHttp.get(this.partMasterAPI.getById.replace('@id', id.toString())).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    addPartMaster(make: any): Observable<PutResponse> {
        return this.tceasHttp.post(this.partMasterAPI.addNew, make).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public updatePartMaster(updatedMake: any): Observable<PutResponse> {
        return this.tceasHttp.put(this.partMasterAPI.update, JSON.stringify(updatedMake)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    deletePartMaster(id: number): Observable<PutResponse> {
        let body = { 'deleted': 1 };
        return this.tceasHttp.put(this.partMasterAPI.delete.replace('@id', id.toString()), body).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }


}
