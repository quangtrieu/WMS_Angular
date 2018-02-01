import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TCEASHttp, ApiResponse, PutResponse, ApiModelResponse } from '../../../commons/app.http.service';
import { SearchViewModel } from "../../shared/models/searchView.model";
import { AppConfig } from '../../../config/app.config';
import { SortColumn } from "../../shared/models/sortColumn.model";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { saveAs } from 'file-saver'

@Injectable()
export class ServicePackageService {
    baseUrl = this.appConfig.config.baseApiServicePackageUrl + "/api";
    baseCQRSUrl = this.appConfig.config.baseCQRSApiUrl + "/api";
    servicePackageAPI = {
        getById: this.baseUrl + '/servicePackage/getById/@id',
        getJobPartById: this.baseUrl + '/servicePackage/getJobPartById/@id',
        getAllByVariantIdAndMilleage: this.baseUrl + '/servicePackage/getAllByVariantIdAndMilleage/@vehicleVariantId/@packageTypeId/@currentMilleage',
        getAllPackageTypes: this.baseUrl + '/servicePackage/getAllPackageTypes',
        addNew: this.baseUrl + '/servicePackage',
        update: this.baseUrl + '/servicePackage',
        upload: this.baseUrl + '/servicePackage/upload',
        download: this.baseUrl + '/servicePackage/download',
        delete: this.baseUrl + '/servicePackage/@id',
        getServicePackages : this.baseUrl + '/servicePackage/getAll'
    };
    constructor(private tceasHttp: TCEASHttp, private appConfig: AppConfig,private http: Http) { }

    public download()
    {
        return this.http.post(this.servicePackageAPI.download,'')
        .map((res: Response) => {
         if (res.status === 401) {
             console.log('error');
         } else if (res.status === 200 || res.status === 304) {
            var blob = new Blob([res._body], { type: 'application/pdf' });
            saveAs(blob, 'Export.pdf');
            return res;
         } else if (res.status < 200 && res.status >= 300) {
             console.log('error');
         } else {
             return true;
         }
 
         }).catch((error: Response | any) => {
             return this.handleError(error);
         });
    }

    public upload (file)
    {
        let formData = new FormData();
        formData.append('file', file);
        var message : any = {};
        let headers = new Headers();
        headers.set('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.servicePackageAPI.upload, formData,options)
       .map((res: Response) => {
        if (res.status === 401) {
            console.log('error');
        } else if (res.status === 200 || res.status === 304) {
            return res.json();
        } else if (res.status < 200 && res.status >= 300) {
            console.log('error');
        } else {
            return true;
        }

        }).catch((error: Response | any) => {
            return this.handleError(error);
        });
    }

    public getServicePackages(currentPage: number, pageSize: number, servicePackageSearch: any, sortColumn: any): Observable<ApiResponse> {
        var searchView = new SearchViewModel();
        searchView.currentPage = currentPage;
        searchView.pageSize = pageSize;
        searchView.data = servicePackageSearch;
        searchView.sortColumn = sortColumn;

        return this.tceasHttp.post(this.servicePackageAPI.getServicePackages, JSON.stringify(searchView)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = `${error.status} - ${error.statusText || ''}`;
            if (error.status === 401) {
                console.log('error');
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //this.notify.error(errMsg);
        return Observable.throw(errMsg);
    }

    getById(id: number): Observable<ApiResponse> {
        return this.tceasHttp.get(this.servicePackageAPI.getById.replace('@id', id.toString())).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getJobPartById(id: number): Observable<ApiResponse> {
        return this.tceasHttp.get(this.servicePackageAPI.getJobPartById.replace('@id', id.toString())).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getAllPackageTypes(): Observable<ApiResponse> {
        return this.tceasHttp.get(this.servicePackageAPI.getAllPackageTypes).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    getAllByVariantIdAndMilleage(vehicleVariantId: number, packageTypeId: number, currentMilleage: number): Observable<ApiResponse> {
        var variantId = (vehicleVariantId == null) ? null : vehicleVariantId.toString();
        var milleage = (currentMilleage == null) ? null : currentMilleage.toString();
        var newPackageTypeId = (packageTypeId == null) ? null: packageTypeId.toString();

        var url = this.servicePackageAPI.getAllByVariantIdAndMilleage.replace('@vehicleVariantId', variantId);
        url = url.replace('@packageTypeId', newPackageTypeId);
        url = url.replace('@currentMilleage', milleage);

        return this.tceasHttp.get(url).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    addServicePackage(make: any): Observable<PutResponse> {
        return this.tceasHttp.post(this.servicePackageAPI.addNew, make).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    public update(updatedMake: any): Observable<PutResponse> {
        return this.tceasHttp.put(this.servicePackageAPI.update, JSON.stringify(updatedMake)).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }

    delete(id: number): Observable<PutResponse> {
        let body = { 'deleted': 1 };
        return this.tceasHttp.put(this.servicePackageAPI.delete.replace('@id', id.toString()), body).retryWhen(attemp => attemp.flatMap(error => {
            return Observable.timer(1000);
        }));
    }
}
