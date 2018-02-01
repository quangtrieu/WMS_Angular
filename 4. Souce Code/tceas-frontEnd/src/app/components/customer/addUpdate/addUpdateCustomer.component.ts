import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms/forms";
import { CustomerService } from "../services/customer.service";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Constants } from "../../../config/app.constant";
import { MessagesService } from './../../../commons/message.utils';
import { FormGroup } from '@angular/forms';

@Component({
    selector: "customer-addUpdate",
    templateUrl: './addUpdateCustomer.component.html',
    styleUrls: ['./addUpdateCustomer.style.css']
})

export class CustomerAddUpdateComponent implements OnInit {

    constructor(private route: ActivatedRoute,
        private router: Router,
        private constant: Constants,
        private customerService: CustomerService,
        private messagesService: MessagesService,
        private slimLoadingBarService: SlimLoadingBarService) { }
    customerTypeObjects: Array<any>;
    countryMobileObjects: Array<any>;
    addressCountryObject: Array<any>;
    addressStateObject: Array<any>;
    pdSalutationList: Array<any>;
    pdOccupationList: Array<any>;
    pdRaceList: Array<any>;
    pdEmploymentStatusList: Array<any>;
    pdCountryList: Array<any>;
    firstLanguageObject: Array<any>;
    secondLanguageObject: Array<any>;
    pdData: any;
    pdIdType: any;
    id: number;
    private sub: any;
    customer: any;
    @ViewChild('frmCustomer') frmCustomer: FormGroup;

    ngOnInit(): void {
        this.customer = {};
        this.pdData = {};
        this.pdIdType = [];
        this.pdSalutationList = [];
        this.pdRaceList = [];
        this.pdOccupationList = [];
        this.pdEmploymentStatusList = [];
        this.pdCountryList = [];
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.frmCustomer.reset();

        // get pd data
        this.customerService
            .getPDData()
            .retry(3)
            .subscribe(result => {
                this.pdData = result.data;
                if (this.pdData) {
                    this.pdIdType = (this.pdData.idType) ? result.data.idType.map(c => ({ label: c.code + " - " + c.description, value: c.id })) : null;
                    this.pdSalutationList = this.pdData.salutation ? result.data.salutation.map(c => ({label: c.code + " - " + c.description, value: c.id})) : null;
                    this.pdSalutationList.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
                    this.pdRaceList = this.pdData.race ? result.data.race.map(c => ({label: c.code + " - " + c.description, value: c.id})) : null;
                    this.pdRaceList.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
                    this.pdOccupationList = this.pdData.occupation ? result.data.occupation.map(c => ({label: c.code + " - " + c.description, value: c.id})) : null;
                    this.pdOccupationList.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
                    this.pdEmploymentStatusList = this.pdData.employeeStatus ? result.data.employeeStatus.map(c => ({label: c.code + " - " + c.description, value: c.id})) : null;
                    this.pdEmploymentStatusList.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
                    this.pdCountryList = this.pdData.country ? result.data.country.map(c => ({label: c.code + " - " + c.description, value: c.id})) : null;
                    this.pdCountryList.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
                    console.log(this.pdData);
                }
            });

        if (this.id) {
            this.customerService
                .getCustomer(this.id)
                .retry(3)
                .subscribe(result => {
                    this.customer = result.data;
                });

        }
        this.customer.gender = 1;
        this.loadDropdowlistCustomerType();
        this.loadDropdowlistCountryMobile();
        this.loadDropdowlistAddressCountry();
        this.loadDropdowlistAddressState();
        this.loadDropdowlistFirstLanguage();
    }

    loadDropdowlistCustomerType() {
        this.customerTypeObjects = [];
        this.customerTypeObjects.push({ label: this.constant.INDIVIDUAL, value: '0' });
        this.customerTypeObjects.push({ label: this.constant.CORPORATE, value: '1' });
        //this.customerTypeObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
    }

    loadDropdowlistCountryMobile() {
        this.countryMobileObjects = [];
        this.countryMobileObjects.push({ label: this.constant.MALAYSIA, value: '1' });
        this.countryMobileObjects.push({ label: this.constant.VIETNAM, value: '0' });
        this.countryMobileObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
    }

    loadDropdowlistAddressCountry() {
        this.addressCountryObject = [];
        this.addressCountryObject.push({ label: this.constant.MY, value: '1' });
        this.addressCountryObject.push({ label: this.constant.VN, value: '0' });
        this.addressCountryObject.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
    }

    loadDropdowlistAddressState() {
        this.addressStateObject = [];
        this.addressStateObject.push({ label: this.constant.KL, value: '1' });
        this.addressStateObject.push({ label: this.constant.HN, value: '2' });
        this.addressStateObject.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
    }

    loadDropdowlistFirstLanguage() {
        this.firstLanguageObject = [];
        this.firstLanguageObject.push({ label: this.constant.BMALAYSIA, value: '1' });
        this.firstLanguageObject.push({ label: this.constant.ENGLISH, value: '2' });
         this.firstLanguageObject.push({ label: this.constant.MANDARIN, value: '3' });
        this.firstLanguageObject.push({ label: this.constant.TAMIL, value: '4' });
        this.firstLanguageObject.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
    }

    loadDropdowlistSecondLanguage() {
        this.secondLanguageObject = [];
        this.secondLanguageObject.push({ label: this.constant.BMALAYSIA, value: '1' });
        this.secondLanguageObject.push({ label: this.constant.ENGLISH, value: '2' });
        this.secondLanguageObject.push({ label: this.constant.MANDARIN, value: '3' });
        this.secondLanguageObject.push({ label: this.constant.TAMIL, value: '4' });
        this.secondLanguageObject.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
    }

    addUpdate(objCustomer) {
        this.slimLoadingBarService.start(() => { });
        if (objCustomer.id) {
            this.customerService.updateCustomer(objCustomer).retry(3).subscribe(result => {
                if (!result.success) {
                    this.messagesService.error(result.message);
                    return;
                }
                this.messagesService.success(result.message);
                this.onCompleted();
            });
        } else {
            this.customerService.addCustomer(objCustomer).retry(3).subscribe(result => {
                if (!result.success) {
                    this.messagesService.error(result.message);
                    return;
                }
                this.messagesService.success(result.message)
                this.onCompleted();
            });
        }
    }

    // addUpdate(objCustomer) {
    //     this.slimLoadingBarService.start(() => { });
    //     if (objCustomer.id) {
    //         this.customerService
    //             .updateCustomer(objCustomer)
    //             .retry(3)
    //             .subscribe(result => {
    //                 this.onCompleted();
    //             });
    //     } else {
    //         this.customerService
    //             .addCustomer(objCustomer)
    //             .retry(3)
    //             .subscribe(result => {
    //                 console.log(result);
    //                 this.onCompleted();
    //             });
    //     }
    // }

    onCompleted() {
        this.slimLoadingBarService.complete();
        this.router.navigate(['/customer/Search']);
    }

    type = true;
    toggle() {
        this.type = !this.type;
    }
}