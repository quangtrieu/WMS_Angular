import { Injectable } from '@angular/core';
declare var toastr: any;
@Injectable()
export class NotifyUtils {

    constructor() {
        toastr.options.timeOut = 3000;
        toastr.options.extendedTimeOut = 3000;
        toastr.options.positionClass = 'toast-top-right';
        toastr.options.bodyOutputType = 'trustedHtml';
    }
    info(text: string): void {
        toastr.info(text);
    }
    warning(text: string): void {
        toastr.warning(text);
    }
    success(text: string): void {
        toastr.success(text);
    }
    error(text: string): void {
        toastr.error(text);
    }
    clear(): void {
        toastr.clear();
    }

}