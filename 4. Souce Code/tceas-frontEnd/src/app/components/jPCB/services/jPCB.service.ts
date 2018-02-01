import { JPCBModel } from './../models/jPCB.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class JPCBService {
    private baseUrl = this.appConfig.config.baseApiUrl + "/api";
    private repairOrderUrl = this.appConfig.config.baseRepairOrderApiUrl + "/api";
    jPCBAPI = {
        getWorkBay: this.baseUrl + '/workBay/getAll',
        getAllByDate: this.repairOrderUrl + '/jPCB/getAllByDate/@date',
        createSuggestedBay: this.repairOrderUrl + '/jPCB/createSuggestedBay',
    };
    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    public getAllWorkBay(): Observable<ApiResponse> {

        var searchView = new SearchViewModel();
        searchView.currentPage = 1;
        searchView.pageSize = 1000;

        return this.tceasHttp.post(this.jPCBAPI.getWorkBay, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public getAllByDate(objDate: string): Promise<JPCBModel[]> {
        let url = this.jPCBAPI.getAllByDate.replace("@date", objDate);
        return this.tceasHttp.get(url).toPromise().then(res => {
            var jpcbs = [];
            if (res.data) {
                res.data.forEach(el => {
                    var jpcb = new JPCBModel();
                    jpcb.id = el.id;
                    jpcb.bayId = el.bayId;
                    jpcb.repairOrderId = el.repairOrderId;
                    jpcb.jPCBStatusId = el.jPCBStatusId;
                    jpcb.serviceAdvisorId = el.serviceAdvisorId;
                    jpcb.startTime = el.startTime;
                    jpcb.endTime = el.endTime;
                    jpcb.registrationNo = el.RepairOrderMaster.VehicleCustomer.registrationNo;
                    jpcb.isCustomerWaiting = el.RepairOrderMaster.isCustomerWaiting;
                    jpcbs.push(jpcb);
                 });
            }
            return jpcbs;
        });
    }

    public createSuggestedBay(repairOrderBay: any): Observable<ApiResponse> {
        return this.tceasHttp.post(this.jPCBAPI.createSuggestedBay, JSON.stringify(repairOrderBay));
    }
}
