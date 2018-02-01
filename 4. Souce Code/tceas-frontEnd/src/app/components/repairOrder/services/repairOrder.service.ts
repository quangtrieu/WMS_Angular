import { ServiceHistoryModel } from './../models/serviceHistory.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class RepairOrderService {
    baseUrl = this.appConfig.config.baseRepairOrderApiUrl + "/api";
    repairOrderAPI = {
        getRepairOrder: this.baseUrl + '/repairOrder/getAll',
        getAllPartType: this.baseUrl + '/repairOrder/getAllPartType',
        getAllPartSource: this.baseUrl + '/repairOrder/getAllPartSource',
        getAllType: this.baseUrl + '/repairOrder/getAllType',
        getAllComeBackJob: this.baseUrl + '/repairOrder/getAllComeBackJob',
        getAllJobSource: this.baseUrl + '/repairOrder/getAllJobSource',
        getAllPaymentType: this.baseUrl + '/repairOrder/getAllPaymentType',
        getById: this.baseUrl + '/repairOrder/getById/@id',
        getFullRepairOrderById: this.baseUrl + '/repairOrder/getFullRepairOrderById/@id',
        addNew: this.baseUrl + '/repairOrder',
        update: this.baseUrl + '/repairOrder',
        delete: this.baseUrl + '/repairOrder/@id',
        getRepairOrderJobs: this.baseUrl + '/repairOrder/getRepairOrderJobs/@id',
        getRepairOrderHistories: this.baseUrl + '/repairOrder/getRepairOrderHistories/@vehicleCustomerId'
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    public getRepairOrder(currentPage: number, pageSize: number, repairOrderSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = repairOrderSearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.repairOrderAPI.getRepairOrder, searchView).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getById(id: number): Observable<ApiModelResponse> {
        return this.tceasHttp.get(this.repairOrderAPI.getById.replace('@id', id.toString())).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getFullRepairOrderById(id: number): Observable<ApiResponse> {
        return this.tceasHttp.get(this.repairOrderAPI.getFullRepairOrderById.replace('@id', id.toString())).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getAllType(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.repairOrderAPI.getAllType).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getAllComeBackJob(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.repairOrderAPI.getAllComeBackJob).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getAllJobSource(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.repairOrderAPI.getAllJobSource).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getAllPaymentType(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.repairOrderAPI.getAllPaymentType).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getAllPartType() {
        return this.tceasHttp.get(this.repairOrderAPI.getAllPartType).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getAllPartSource() {
        return this.tceasHttp.get(this.repairOrderAPI.getAllPartSource).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    addRepairOrder(repairOrder: any): Observable<PutResponse> {
        return this.tceasHttp.post(this.repairOrderAPI.addNew, repairOrder).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public updateRepairOrder(repairOrder: any): Observable<PutResponse> {
        return this.tceasHttp.put(this.repairOrderAPI.update, JSON.stringify(repairOrder)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    deleteRepairOrder(id: number): Observable<PutResponse> {
        let body = { 'deleted': 1 };
        return this.tceasHttp.put(this.repairOrderAPI.delete.replace('@id', id.toString()), body).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getJobsByRepairOrderId(repairOrderId: number): Observable<ApiResponse> {
        return this.tceasHttp.get(this.repairOrderAPI.getRepairOrderJobs.replace('@id', repairOrderId.toString()));
    }

    getRepairOrderHistories(vehicleCustomerId: number): Promise<ServiceHistoryModel[]> {
        return this.tceasHttp.get(this.repairOrderAPI.getRepairOrderHistories.replace('@vehicleCustomerId', vehicleCustomerId.toString())).toPromise()
            .then(result => {
                var data = result.data as ServiceHistoryModel[];
                return data;
            });
    }
}
