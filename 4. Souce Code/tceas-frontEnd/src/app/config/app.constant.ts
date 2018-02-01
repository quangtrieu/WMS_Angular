import { Injectable } from '@angular/core';
import { JobTrackingStatusEnum } from "../commons/enums/jobTrackingStatusEnum";
import { JobFulfilmentStatusEnum } from "../commons/enums/jobFulfilmentStatusEnum";
@Injectable()
export class Constants {
    readonly keyStore = {
        CURRENT_USER: 'currentUser',
        KEEP_LOGIN: 'keepLogin',
        USER_NAME: 'userName',
        USER_ID: 'userId',
        LIST_PERMISSION: 'list'
    };
    readonly PAGE_SIZE_DEFAULT = 10;
    readonly All_STATUS = "All Status";
    readonly SELECT_DEFAULT = "----- SELECT -----";
    readonly STATUS_NEW = 'NEW';
    readonly YES = "YES";
    readonly NO = "NO";
    readonly RADIO_DEFAULT = 1;
    readonly SALE_TAX = 6; //6% RepairOrder summary

    // customertype
    readonly INDIVIDUAL = "Individual";
    readonly CORPORATE = "Corporate";
    
    //country mobile
    readonly MALAYSIA = "+60";
    readonly VIETNAM = "+84";

    //address Country
    readonly MY = "MY";
    readonly VN = "VN";

    //addressState
    readonly KL = "KL";
    readonly HN = "HN";

    //first language 
    readonly BMALAYSIA = "B.MALAYSIA";
    readonly ENGLISH = "ENGLISH";
    readonly MANDARIN = "MANDARIN";
    readonly TAMIL = "TAMIL";

    //define appState handle render component
    readonly DASHBOARD_CLICK_SEARCH_CUSTOMER = "dashboard.searchCustomer";

    readonly Enums = {
        JobTrackingStatus: JobTrackingStatusEnum,
        JobFulfilmentStatus: JobFulfilmentStatusEnum
    }
}
