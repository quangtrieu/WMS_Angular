import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class VehicleCustomerService {
    baseUrl = this.appConfig.config.baseApiUrl + "/api";

    vehicleCustomerAPI = {
        getVehicleByRegistrationNo: this.baseUrl + '/vehicleCustomer/getVehicleByRegistrationNo/@registrationNo',
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    getVehicleByRegistrationNo(registrationNo: string): Observable<ApiModelResponse> {
        return this.tceasHttp.get(this.vehicleCustomerAPI.getVehicleByRegistrationNo.replace('@registrationNo', registrationNo)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }
}
