import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class AppointmentService {
    baseAppoinmentApiUrl = this.appConfig.config.baseAppoinmentApiUrl + '/api';
    baseApiMasterDataUrl = this.appConfig.config.baseApiMasterDataUrl + '/api';
    appointmentAPI = {
        getAppointment: this.baseAppoinmentApiUrl + '/appointment/getAll',
        getById: this.baseAppoinmentApiUrl + '/appointment/getById/@id',
        addNew: this.baseAppoinmentApiUrl + '/appointment',
        update: this.baseAppoinmentApiUrl + '/appointment',
        delete: this.baseAppoinmentApiUrl + '/appointment/@id',
        getAllServiceAdvisor: this.baseApiMasterDataUrl + '/serviceAdvisor/getAll',
        getAllAppointmentByRegistrationNo: this.baseAppoinmentApiUrl + '/appointment/getAllAppointmentByRegistrationNo/@workShopId/@registrationNo'
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    public getAppointment(currentPage: number, pageSize: number, AppointmentSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = AppointmentSearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.appointmentAPI.getAppointment, searchView).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getFullAppointmentById(id: number): Observable<ApiResponse> {
        return this.tceasHttp.get(this.appointmentAPI.getById.replace('@id', id.toString())).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getAllAppointmentByRegistrationNo(workShopId: number, registrationNo: string) {
        var url = this.appointmentAPI.getAllAppointmentByRegistrationNo.replace('@workShopId', workShopId.toString());
        url = url.replace("@registrationNo", registrationNo);

        return this.tceasHttp.get(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    addAppointment(repairOrder: any): Observable<PutResponse> {
        return this.tceasHttp.post(this.appointmentAPI.addNew, repairOrder).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    updateAppointment(repairOrder: any): Observable<PutResponse> {
        return this.tceasHttp.put(this.appointmentAPI.update, JSON.stringify(repairOrder)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    deleteAppointment(id: number): Observable<PutResponse> {
        let body = { 'deleted': 1 };
        return this.tceasHttp.put(this.appointmentAPI.delete.replace('@id', id.toString()), body).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getAllServiceAdvisor(currentPage: number, pageSize: number, search: any): Promise<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = search;
        return this.tceasHttp.post(this.appointmentAPI.getAllServiceAdvisor, JSON.stringify(searchView)).toPromise();
    }
}
