import { Injectable } from '@angular/core';
import { ItemEnum } from "./enums/itemEnum";
import { Constants } from '../config/app.constant';

@Injectable()
export class Utils {

    constructor(
        private constant: Constants,
    ) { }

    public getTimeFromDateTime(objDateTime: string) {
        var d = new Date(objDateTime);
        var temp = d.getTime() + d.getTimezoneOffset() * 60 * 1000;
        var date = new Date(temp);
        return (((d.getHours() - (d.getTimezoneOffset() / 60)) < 10) ? "0" : "") +
            (d.getHours() - (d.getTimezoneOffset() / 60)) + ":" + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes();
    }

    public getTimeFromDateTimeNonTimeZone(objDateTime: string) {
        var d = new Date(objDateTime);
        // return (d.getHours() < 10 ? ("0" + d.getHours()) : d.getHours()) + ":" + (d.getMinutes() < 10 ? ("0" + d.getMinutes()) : d.getMinutes());
        return d.getHours() + ":" + d.getMinutes();
    }

    public getDateFromDateTime(objDateTime: string) {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        return d.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    }

    getDayName(value: Date) {
        var day = value.getDay();
        var weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";

        return weekday[day];
    }

    convertDateLocalToUTC(value: Date): Date {
        var offsetTime = value.getTimezoneOffset() * 60 * 1000;
        return new Date(value.getTime() + offsetTime);
    }

    convertDateTime(value: Date) {
        if (value) {
            var year = value.getFullYear();
            var month = value.getMonth();
            var day = value.getDay();
            var house = value.getHours();
            var minutes = value.getMinutes();

            return year + "/" + month + "/" + day + "/" + house + ":" + minutes;
        }
    }

    convertDateUTCToLocal(value: Date): Date {
        var offsetTime = value.getTimezoneOffset() * 60 * 1000;
        return new Date(value.getTime() - offsetTime);
    }

    getEnum(enums: any[], id: number): ItemEnum {
        var item = enums.filter(i => i.id == id);
        return <ItemEnum>item[0];
    }

    displayDateTimeControl(valueInUTC: string): string {
        if (!valueInUTC) return null;

        var d = new Date(valueInUTC);
        var month = d.getMonth() + 1;
        var day = d.getDate();

        var result: string = d.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + "T" +
            ((d.getHours() < 10) ? "0" : "") +
            (d.getHours()) + ":" + ((d.getMinutes() < 10) ? "0" : "") + d.getMinutes();

        return result;
    }

    removeLastSymbol(value: string, symbol: string): string {
        if (!value) return null;

        let result = value.substring(0, value.lastIndexOf(symbol));

        return result;
    }

    getDateOnly(d: Date) {
        var month = d.getMonth() + 1;
        var day = d.getDate();
        return d.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    }

    loadDropdowlistStatus() {
        var statusObjects = [];
        statusObjects.push({ label: this.constant.All_STATUS, value: null });
        statusObjects.push({ label: this.constant.YES, value: '1' });
        statusObjects.push({ label: this.constant.NO, value: '0' });
        return statusObjects;
    }
}