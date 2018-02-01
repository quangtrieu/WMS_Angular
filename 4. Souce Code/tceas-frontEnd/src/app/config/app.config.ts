import { Injectable } from '@angular/core';
import { UserModel } from '../components/shared/models/user.model';

@Injectable()
export class AppConfig {
    config = {
        name: 'TCEAS',
        title: 'tceas-project for TC systems',
        version: '0.2.0',
        devMode: false,
        baseApiUrl: 'http://localhost:5555', // This will remove later
        baseApiMasterDataUrl: 'http://localhost:5555',
        baseCQRSApiUrl: 'http://localhost:5000',
        baseJobApiUrl: 'http://localhost:5100',
        basePartApiUrl: 'http://localhost:5200',
        baseRepairOrderApiUrl: 'http://localhost:5300',
        baseAppoinmentApiUrl: 'http://localhost:5400',
        baseApiServicePackageUrl: 'http://localhost:5500',

        /**
         * Whether to print and alert some log information
         */
        debug: true,
        formatDate: 'MM-dd-yyyy',
        formatDateTime: 'MM-dd-yyyy HH:mm',

        constructor() { },

        getConfig(): Object {
            return this.config;
        }
    }
}

export class TCEASGlobal {
    private user: UserModel;
    private currentUrl: string;
    notifyCount = 0;
    userName: string;
    userAva: string;
    setUser(user: UserModel) {
        this.user = user;
    }

    getUer(): UserModel {
        return this.user;
    }

    setCurrentUrl(url: string) {
        this.currentUrl = url;
    }

    getCurrentUrl(): string {
        return this.currentUrl;
    }
}


