import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class JobSectionService {
    baseUrl = this.appConfig.config.baseJobApiUrl + "/api";

    sectionAPI = {
        getAll: this.baseUrl + '/jobSection/getAll',
        getListSectionByJobGroupId: this.baseUrl + '/jobSection/getListSectionByJobGroupId/@jobGroupId',
        add: this.baseUrl + '/jobSection',
        update: this.baseUrl + '/jobSection',
        delete: this.baseUrl + '/jobSection/@id',
        getById: this.baseUrl + '/jobSection/getById/@id'
    };

    constructor(public tceasHttp: TCEASHttp, private appConfig: AppConfig) {}

    public getListSectionByJobGroupId(jobGroupId: number): Observable<ApiResponse> {
        return this.tceasHttp.get(this.sectionAPI.getListSectionByJobGroupId.replace('@jobGroupId', jobGroupId.toString()));
    }
}
