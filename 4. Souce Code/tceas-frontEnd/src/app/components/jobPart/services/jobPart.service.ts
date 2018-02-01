import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class JobPartService {
    baseUrl = this.appConfig.config.baseJobApiUrl + "/api";

    jobPartAPI = {
        getAll: this.baseUrl + '/jobPart/getAll',
        getById: this.baseUrl + '/jobPart/getById',
        getByJobId: this.baseUrl + '/jobPart/getByJobId',
        getVehicleMake: this.baseUrl + '/jobPart/getVehicleMake',
        getVehicleModel: this.baseUrl + '/jobPart/getVehicleModel',
        getVehicleVariant: this.baseUrl + '/jobPart/getVehicleVariant',
        getAllVehicleModel: this.baseUrl + '/jobPart/getVehicleModel',
        getAllVehicleVariant: this.baseUrl + '/jobPart/getVehicleVariant',
        getJobMaster: this.baseUrl + '/jobPart/getJobMaster',
        getPartMaster: this.baseUrl + '/jobPart/getPartMaster',
        getLatestJobPartMaster: this.baseUrl + '/jobPart/getLastestJobPartMasterId',
        create: this.baseUrl + '/jobPart/',
        update: this.baseUrl + '/jobPart/update',
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    public getAll(currentPage: number, pageSize: number, jobPartSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = jobPartSearch;
        return this.tceasHttp.post(this.jobPartAPI.getAll, JSON.stringify(searchView));
    }

    public getById(make: any): Observable<ApiResponse> {
        return this.tceasHttp.post(this.jobPartAPI.getById, make).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getByJobId(make: any): Observable<ApiResponse> {
        return this.tceasHttp.post(this.jobPartAPI.getByJobId, make).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public update(make: any): Observable<ApiResponse> {
        return this.tceasHttp.put(this.jobPartAPI.update, make).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getLatestJobPartMaster(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.jobPartAPI.getLatestJobPartMaster).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getVehicleMake(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.jobPartAPI.getVehicleMake).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getVehicleModel(make: any): Observable<ApiResponse> {
        return this.tceasHttp.post(this.jobPartAPI.getVehicleModel, make).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getVehicleVariant(make: any): Observable<ApiResponse> {
        return this.tceasHttp.post(this.jobPartAPI.getVehicleVariant, make).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getAllVehicleModel(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.jobPartAPI.getAllVehicleModel).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getAllVehicleVariant(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.jobPartAPI.getAllVehicleVariant).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getJobMaster(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.jobPartAPI.getJobMaster).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getPartMaster(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.jobPartAPI.getPartMaster).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public create(make: any): Observable<ApiResponse> {
        return this.tceasHttp.post(this.jobPartAPI.create, make).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

}
