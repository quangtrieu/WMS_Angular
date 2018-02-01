import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class ModelVariantService {
    baseUrl = this.appConfig.config.baseApiUrl + "/api";
    modelVariantAPI = {
        getAll: this.baseUrl + '/vehicleVariant/getAll',
        add: this.baseUrl + '/vehicleVariant',
        update: this.baseUrl + '/vehicleVariant',
        delete: this.baseUrl + '/vehicleVariant/@id',
        getById: this.baseUrl + '/vehicleVariant/getById/@id',
        checkExistCode: this.baseUrl + '/vehicleVariant/checkExistCode',
        getByVehicleModel: this.baseUrl + '/vehicleVariant/getByVehicleModelId/@id',
        filterVehiclevariant: this.baseUrl + '/vehicleVariant/filter'
    };
    
    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    
    public getAll(currentPage: number, pageSize: number, vehicleVariantSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = vehicleVariantSearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.modelVariantAPI.getAll, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    // public getById(id: number): Observable<ApiResponse>{
    //     return this.tceasHttp.get(this.modelVariantAPI.getById.replace('@id',id.toString()));
        
    // }
    public getById(id: number): Observable<ApiResponse>{
        return this.tceasHttp.get(this.modelVariantAPI.getById.replace('@id', id.toString())).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    // public add(ModelVariant: any): Observable<ApiResponse>{
    //     return this.tceasHttp.post(this.modelVariantAPI.add, JSON.stringify(ModelVariant));
    // }
    public add(ModelVariant: any): Observable<PutResponse> {
        return this.tceasHttp.post(this.modelVariantAPI.add, ModelVariant).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    // public update(ModelVariant: any): Observable<ApiResponse>{
    //     return this.tceasHttp.put(this.modelVariantAPI.update, JSON.stringify(ModelVariant));
    // }
    public update(ModelVariant: any): Observable<PutResponse> {
        return this.tceasHttp.put(this.modelVariantAPI.update, JSON.stringify(ModelVariant)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public delete(id: number): Observable<ApiResponse>{
        return this.tceasHttp.delete(this.modelVariantAPI.getById.replace('@id',id.toString()));
    }

    public getByVehicleModelId(id: number): Observable<ApiResponse>{
        return this.tceasHttp.get(this.modelVariantAPI.getByVehicleModel.replace('@id',id.toString()));
    }

    public checkExistCode(vehicleVariant: any): Observable<any> {
        return this.tceasHttp.post(this.modelVariantAPI.checkExistCode, JSON.stringify(vehicleVariant)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public filterVehicleVariants(currentPage: number, pageSize: number, vehicleModelSearch: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = vehicleModelSearch;

        return this.tceasHttp.post(this.modelVariantAPI.filterVehiclevariant, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }
}
