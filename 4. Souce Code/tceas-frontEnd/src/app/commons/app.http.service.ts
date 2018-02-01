import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { TCEASGlobal } from '../config/app.config';
// import { NotifyUtils } from '../commons/notify.utils';

import 'rxjs/Rx';
import { Constants } from "../config/app.constant";

@Injectable()
export class TCEASHttp {
    constructor(private http: Http, private constant: Constants, private global: TCEASGlobal,
        private router: Router) {
    }

    createAuthorizationHeader(): Headers {
        let token = localStorage.getItem(this.constant.keyStore.CURRENT_USER);
        let headers = new Headers({
            // 'Authorization': token,
            'Content-Type': 'application/json;charset=UTF-8'
        });
        return headers;
    }

    public get(url: string): Observable<any> {
        return this.http.get(url, {
            headers: this.createAuthorizationHeader()
        }).map((res: Response) => {
            if (res.status === 401) {
                console.log('error');
            } else if (res.status === 200 || res.status === 304) {
                return res.json();
            } else if (res.status < 200 && res.status >= 300) {
                console.log('error');
            } else {
                return res.json();
            }
        }).catch((error: Response | any) => {
            return this.handleError(error);
        });
    }

    public post(url: string, data: any): Observable<any> {
        return this.http.post(url, data, {
            headers: this.createAuthorizationHeader()
        }).map((res: Response) => {
            if (res.status === 401) {
                console.log('error');
            } else if (res.status === 200 || res.status === 304) {
                return res.json();
            } else if (res.status < 200 && res.status >= 300) {
                console.log('error');
            } else {
                return res.json();
            }

        }).catch((error: Response | any) => {
            return this.handleError(error);
        });
    }

    public put(url: string, data: any): Observable<any> {
        return this.http.put(url, data, {
            headers: this.createAuthorizationHeader()
        }).map((res: Response) => {
            if (res.status === 401) {
                console.log('error');
            } else if (res.status === 200 || res.status === 304) {
                return res.json();
            } else if (res.status < 200 && res.status >= 300) {
                console.log('error');
            } else {
                return res.json();
            }

        }).catch((error: Response | any) => {
            return this.handleError(error);
        });
    }

    public delete(url: string): Observable<any> {
        return this.http.delete(url, {
            headers: this.createAuthorizationHeader()
        }).map((res: Response) => {
            if (res.status === 401) {
                console.log('error');
            } else if (res.status === 200 || res.status === 304) {
                return res.json();
            } else if (res.status < 200 && res.status >= 300) {
                console.log('error');
            } else {
                return res.json();
            }

        }).catch((error: Response | any) => {
            return this.handleError(error);
        });
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = `${error.status} - ${error.statusText || ''}`;
            if (error.status === 401) {
                localStorage.removeItem(this.constant.keyStore.CURRENT_USER);
                console.log('error');
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //this.notify.error(errMsg);
        return Observable.throw(errMsg);
    }
}

export class ApiResponse {
    success: number;
    message: string;
    data: any;
}

export class PutResponse {
    success: number;
    message: string;
    data: any;
}

export class DataObject {
    count: number;
    rows: Array<any>;
}

export class DataModel {
    id: number;
    name: string;
}

export class ApiModelResponse {
    success: number;
    message: string;
    data: Array<DataModel>;
}
