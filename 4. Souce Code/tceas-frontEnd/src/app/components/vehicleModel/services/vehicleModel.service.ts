import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class VehicleModelService {
    baseUrl = this.appConfig.config.baseApiUrl + "/api";
    vehicleModelAPI = {
        getAll: this.baseUrl + '/vehicleModel/getAll',
        add: this.baseUrl + '/vehicleModel',
        update: this.baseUrl + '/vehicleModel',
        delete: this.baseUrl + '/vehicleModel/@id',
        getById: this.baseUrl + '/vehicleModel/getById/@id',
        getByVehicleMakeId: this.baseUrl + '/vehicleModel/getByVehicleMakeId/@id',
        checkExistCode: this.baseUrl + '/vehicleModel/checkExistCode',
        filterVehicleModels: this.baseUrl + '/vehicleModel/filter'
    };
    
    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    public getAll(currentPage: number, pageSize: number, search: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = search;
        searchView.sortColumn=sortColumn;
        return this.tceasHttp.post(this.vehicleModelAPI.getAll, JSON.stringify(searchView));
    }

    public filterVehicleModels(currentPage: number, pageSize: number, vehicleModelSearch: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = vehicleModelSearch;

        return this.tceasHttp.post(this.vehicleModelAPI.filterVehicleModels, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getById(id: number): Observable<ApiResponse>{
        //return this.tceasHttp.get(this.vehicleModelAPI.getById.replace('@id',id.toString()));
        return this.tceasHttp.get(this.vehicleModelAPI.getById.replace('@id', id.toString())).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }
   

    public checkExistCode(vehicleModel: any): Observable<any> {
        return this.tceasHttp.post(this.vehicleModelAPI.checkExistCode, JSON.stringify(vehicleModel)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public add(VehicleModel: any): Observable<ApiResponse>{
        //return this.tceasHttp.post(this.vehicleModelAPI.add, JSON.stringify(VehicleModel));
        return this.tceasHttp.post(this.vehicleModelAPI.add, VehicleModel).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public update(VehicleModel: any): Observable<ApiResponse>{
        return this.tceasHttp.put(this.vehicleModelAPI.update, JSON.stringify(VehicleModel)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public delete(id: number): Observable<ApiResponse>{
        return this.tceasHttp.delete(this.vehicleModelAPI.getById.replace('@id',id.toString()));
    }

    public getByVehicleMakeId(id: number): Observable<ApiResponse>{
        return this.tceasHttp.get(this.vehicleModelAPI.getByVehicleMakeId.replace('@id',id.toString()));
    }
}
