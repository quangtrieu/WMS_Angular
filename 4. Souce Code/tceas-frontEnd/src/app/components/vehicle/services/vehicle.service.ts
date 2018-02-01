import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';
import { SortColumn } from "../../shared/models/sortColumn.model";

@Injectable()
export class VehicleService {
    private baseUrl = this.appConfig.config.baseApiUrl + "/api";
    vehicleAPI = {
        getAll: this.baseUrl + '/vehicle/getAll',
        update: this.baseUrl + '/vehicle',
        delete: this.baseUrl + '/vehicle/@id',
        getVehicle: this.baseUrl + '/vehicleCustomer/getByVehicle/@id',
        getByRegisterNoVinNo: this.baseUrl + '/vehicle/getByNo',
        checkVinNo: this.baseUrl + '/vehicle/checkVinNo',
        checkRegistrationNo: this.baseUrl + '/vehicleCustomer/checkRegistrationNo',
        checkExistChassisNo: this.baseUrl + '/vehicle/checkExistChassisNo/@chassisNo',
        getVehicleByChassisNo: this.baseUrl + '/vehicle/getVehicleByChassisNo/@chassisNo',
    };

    constructor(private tceasHttp: TCEASHttp, private appConfig: AppConfig) { }

    
    public getAll(currentPage: number, pageSize: number, vehicleSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = vehicleSearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.vehicleAPI.getAll, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getVehicle(id: number): Observable<ApiResponse> {
        let url = this.vehicleAPI.getVehicle.replace('@id', id + "");

        return this.tceasHttp.get(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    addVehicle(vehicle: any): Observable<ApiResponse> {
        return this.tceasHttp.post(this.vehicleAPI.update, vehicle).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    updateVehicle(vehicle: any): Observable<ApiResponse> {
        return this.tceasHttp.put(this.vehicleAPI.update, vehicle).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    deleteVehicle(id: string): Observable<ApiResponse> {
        let url = this.vehicleAPI.delete.replace('@id', id);

        return this.tceasHttp.delete(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getVehicleByRegisterNoVinNo(vehicle: any) {
        return this.tceasHttp.post(this.vehicleAPI.getByRegisterNoVinNo, vehicle).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public checkRegistrationNo(vehicle: any): Observable<any> {
        return this.tceasHttp.post(this.vehicleAPI.checkRegistrationNo, JSON.stringify(vehicle)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public checkExistChassisNo(chassisNo: string): Observable<any> {
        let url = this.vehicleAPI.checkExistChassisNo.replace('@chassisNo', chassisNo + "");
         return this.tceasHttp.get(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
        // return this.tceasHttp.post(this.vehicleAPI.checkExistChassisNo, JSON.stringify(chassisNo)).retryWhen(attemp => attemp.flatMap(error => {
        //     return Observable.timer(1000);
        // }));
    }

    public getInfoVehicleByChassisNo(chassisNo: string): Observable<ApiResponse> {
        let url = this.vehicleAPI.getVehicleByChassisNo.replace('@chassisNo', chassisNo + "");

        return this.tceasHttp.get(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    checkVinNo(obj: any) {
        return this.tceasHttp.post(this.vehicleAPI.checkVinNo, obj).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }
}
