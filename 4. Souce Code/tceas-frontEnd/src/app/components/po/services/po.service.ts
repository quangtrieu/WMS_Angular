import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';
import { SortColumn } from "../../shared/models/sortColumn.model";
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class POService {
    private baseUrl = this.appConfig.config.basePartApiUrl + "/api";
    poAPI = {
        upload: this.baseUrl + '/goodsReceiving/upload',
    };

    constructor(private tceasHttp: TCEASHttp, private appConfig: AppConfig,private http: Http) { }

    public upload (file)
    {
        let formData = new FormData();
        formData.append('file', file);
        var message : any = {};
        let headers = new Headers();
        headers.set('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.poAPI.upload, formData,options)
        .map((response:Response) => <string>response.json())
        .subscribe((data) => message = data);
    }
}
