import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CustomerProfile } from '../models/customerProfile.model';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { AppConfig } from '../../../config/app.config';
import { SearchViewModel } from "../../shared/models/searchView.model";
import * as moment from 'moment';

@Injectable()
export class TimeSlotSetupService {
    private baseApiMasterDataUrl = this.appConfig.config.baseApiMasterDataUrl + "/api";
    private baseAppointmentApiUrl = this.appConfig.config.baseAppoinmentApiUrl + "/api";

    timeSlotSetupAPI = {
        getTimeSlots: this.baseApiMasterDataUrl + '/timeSlot/getTimeSlots/@workShopId',
        getTimeSlotDetailById: this.baseApiMasterDataUrl + '/timeSlot/getTimeSlotDetailById/@id',
        getTimeSlotSpecialDay: this.baseApiMasterDataUrl + '/timeSlot/getTimeSlotSpecialDay',
        getTimeSlotSpecialDaysByDateRange: this.baseApiMasterDataUrl + '/timeSlot/getTimeSlotSpecialDaysByDateRange',
        getTimeSlotDetailUses: this.baseAppointmentApiUrl + '/appointment/getTimeSlotDetailUses',
        getTimeSlotMaster: this.baseApiMasterDataUrl + '/timeSlot/getTimeSlotMaster',
        updateTimeSlotMaster: this.baseApiMasterDataUrl + '/timeSlot',
        addNewTimeSlotSpecialDay: this.baseApiMasterDataUrl + '/timeSlot',
        updateTimeSlotDetail: this.baseApiMasterDataUrl + '/timeSlot/timeSlotDetail',
        getTimeSlotByDate: this.baseApiMasterDataUrl + '/timeslot/getTimeSlotByDate',
        getWorkShop: this.baseApiMasterDataUrl + '/workShop/getAll',
    };

    constructor(private tceasHttp: TCEASHttp, private appConfig: AppConfig) { }

    public getTimeSlots(workShopId): Observable<ApiResponse> {
        if(!workShopId) workShopId = 0;
        return this.tceasHttp.get(this.timeSlotSetupAPI.getTimeSlots.replace("@workShopId",workShopId.toString()));
    }

    public getTimeSlotDetailById(id: number): Observable<ApiResponse> {
        return this.tceasHttp.get(this.timeSlotSetupAPI.getTimeSlotDetailById.replace("@id", id.toString()));
    }

    public getTimeSlotSpecialDay(currentPage: number, pageSize: number, timeSlotSpecialDay: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = timeSlotSpecialDay;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.timeSlotSetupAPI.getTimeSlotSpecialDay, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public addNewTimeSlotSpecialDay(make: any): Observable<PutResponse> {
        return this.tceasHttp.post(this.timeSlotSetupAPI.addNewTimeSlotSpecialDay, make).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getTimeSlotMaster(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.timeSlotSetupAPI.getTimeSlotMaster);
    }

    public updateTimeSlotMaster(obj: any): Observable<ApiResponse> {
        return this.tceasHttp.put(this.timeSlotSetupAPI.updateTimeSlotMaster, obj);
    }

    public getTimeSlotSpecialDaysByDateRange(startDate: any, endDate: any): Observable<ApiResponse> {
        var range: any = {};
        range.startDate = startDate;
        range.endDate = endDate;
        return this.tceasHttp.post(this.timeSlotSetupAPI.getTimeSlotSpecialDaysByDateRange, JSON.stringify(range));
    }

    public getTimeSlotDetailUses(workShopId: any, startDate: any, endDate: any): Observable<ApiResponse> {
        if(!workShopId) workShopId = 0;
        var data: any = {};
        data.workShopId = workShopId;
        data.startDate = startDate;
        data.endDate = endDate;
        return this.tceasHttp.post(this.timeSlotSetupAPI.getTimeSlotDetailUses, JSON.stringify(data));
    }

    public updateTimeSlotDetail(obj: any): Observable<ApiResponse> {
        return this.tceasHttp.put(this.timeSlotSetupAPI.updateTimeSlotDetail, obj);
    }

    public getTimeSlotByDate(objDate: string)  : Observable<ApiResponse> {
        var obj: any = {};
        obj.currentDate = objDate;
        return this.tceasHttp.post(this.timeSlotSetupAPI.getTimeSlotByDate, JSON.stringify(obj));
    }

    public getWorkShops() : Promise<any> {
        var searchView = new SearchViewModel();
        searchView.currentPage = 1;
        searchView.pageSize = Number.MAX_SAFE_INTEGER;
        return this.tceasHttp.post(this.timeSlotSetupAPI.getWorkShop, JSON.stringify(searchView)).toPromise().then(result=>{
            return result.data.rows;
        });
    }
}
