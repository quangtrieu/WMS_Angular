import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class JobPartService {
    baseUrl = this.appConfig.config.baseJobApiUrl + "/api";
    jobPartAPI = {
        getByJobIdAndVariantId: this.baseUrl + '/jobPart/getByJobIdAndVariantId/@jobId/@vehicleVariantId',
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

    }

    getByJobIdAndVariantId(jobId: string, vehicleVariantId: string): Promise<ApiModelResponse> {
        var url = this.jobPartAPI.getByJobIdAndVariantId.replace('@jobId', jobId);
        url = url.replace("@vehicleVariantId", vehicleVariantId);
        
        return this.tceasHttp.get(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        })).toPromise();
    }
}
