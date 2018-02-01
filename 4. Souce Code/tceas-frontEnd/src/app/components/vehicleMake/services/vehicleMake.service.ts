import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class VehicleMakeService {
    baseUrl = this.appConfig.config.baseApiUrl + "/api";
    vehicleMakeAPI = {
        getVehicleMakes: this.baseUrl + '/vehicleMake/getAll',
        addNew: this.baseUrl + '/vehicleMake',
        update: this.baseUrl + '/vehicleMake',
        delete: this.baseUrl + '/vehicleMake/@id',
        getModelByMakeId: this.baseUrl + '/vehicleMake/getModels/@id',
        getById: this.baseUrl + '/vehicleMake/getById/@id',
        checkExistCode: this.baseUrl + '/vehicleMake/checkExistCode',
        filterVehicleMakes: this.baseUrl + '/vehicleMake/filter'
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    public getVehicleMakes(currentPage: number, pageSize: number, vehicleMakeSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = vehicleMakeSearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.vehicleMakeAPI.getVehicleMakes, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getById(id: number): Observable<ApiResponse> {
        return this.tceasHttp.get(this.vehicleMakeAPI.getById.replace('@id', id.toString())).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public checkExistCode(vehicleMake: any): Observable<any> {
        return this.tceasHttp.post(this.vehicleMakeAPI.checkExistCode, JSON.stringify(vehicleMake)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public addVehicleMake(make: any): Observable<PutResponse> {
        return this.tceasHttp.post(this.vehicleMakeAPI.addNew, make).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public updateVehicleMake(vehicleMake: any): Observable<PutResponse> {
        return this.tceasHttp.put(this.vehicleMakeAPI.update, JSON.stringify(vehicleMake)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public deleteVehicleMake(id: number): Observable<PutResponse> {
        let body = { 'deleted': 1 };
        return this.tceasHttp.put(this.vehicleMakeAPI.delete.replace('@id', id.toString()), body).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getModelByMakeId(id: number): Observable<ApiModelResponse> {
        return this.tceasHttp.get(this.vehicleMakeAPI.getModelByMakeId.replace('@id', id.toString())).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

     public filterVehicleMakes(currentPage: number, pageSize: number, vehicleMakeSearch: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = vehicleMakeSearch;

        return this.tceasHttp.post(this.vehicleMakeAPI.filterVehicleMakes, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }
}
