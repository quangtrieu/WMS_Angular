import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TechnicalReport } from '../models/technicalReport.model';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class TechnicalReportService {
    private baseUrl = this.appConfig.config.baseApiUrl + "/api";
    technicalReportAPI = {
        getTechnicalReport: this.baseUrl + '/technicalReport/getPaging',
        addNew: this.baseUrl + '/technicalReport',
        update: this.baseUrl + '/technicalReport/@id',
        delete: this.baseUrl + '/technicalReport/@id',
    };

    constructor(private tceasHttp: TCEASHttp, private appConfig: AppConfig) { }

    public getTechnicalReports(searchView: SearchViewModel): Observable<ApiResponse> {
        var urlLink = "http://localhost:3000/app/components/technicalReport/services/dummy.data.technicalReport.json";
        return this.tceasHttp.get(urlLink).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }
}
