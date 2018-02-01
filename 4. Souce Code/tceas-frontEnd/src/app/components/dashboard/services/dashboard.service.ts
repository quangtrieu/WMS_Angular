import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';
// Dummy data

@Injectable()
export class DashboardService {
   
   constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {

   }

    public getServiceSummaries(currentPage: number, pageSize: number, dataSearch: object):Observable<ApiResponse> {
        /*var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = dataSearch;*/
        // Dummy data
        return this.tceasHttp.get("http://localhost:3000/app/components/dashboard/services/dummy.data.serviceSummaryDashboard.json").retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
        
    }
}