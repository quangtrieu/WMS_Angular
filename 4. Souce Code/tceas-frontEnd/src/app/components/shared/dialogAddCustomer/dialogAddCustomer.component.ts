import { CustomerService } from './../../customer/services/customer.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Constants } from "../../../config/app.constant";
import { FormGroup } from '@angular/forms';
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { MessagesService } from './../../../commons/message.utils';
import { ActivatedRoute, Router } from '@angular/router';

declare const $: any;

@Component({
    selector: "dialogCustomer-add",
    templateUrl: './dialogAddCustomer.component.html'
})

export class DialogAddCustomerComponent implements OnInit {

    @Output() bindCustomer: EventEmitter<string> = new EventEmitter<string>();
    @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

    customer: any;
    customerTypeObjects: Array<any>;
    pdIdType: any;
    pdData: any;
    @ViewChild('frmCustomer') frmCustomer: FormGroup;

    constructor(private customerService: CustomerService,
        private constant: Constants,
        private slimLoadingBarService: SlimLoadingBarService,
        private messagesService: MessagesService,
        private router: Router,
    ) { 
        
    }

    ngOnInit(): void {
        this.customer = {};
        this.pdData = [];
        this.pdIdType = [];
        $('#dialogCustomerAdd-modal').on('shown.bs.modal', () => {
            this.loadDropdowlistCustomerType();
            this.customerService
            .getPDData()
            .retry(3)
            .subscribe(result => {
                this.pdData = result.data;
                if (this.pdData) {
                    this.pdIdType = (this.pdData.idType) ? result.data.idType.map(c => ({ label: c.code + " - " + c.description, value: c.id })) : null;
                    //this.pdIdType.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
                }});
            this.frmCustomer.reset();
        });        
    }

    // #region event
    onCloseDialog() {
        this.closeDialog.emit(true);
    }

    // onAddCustomer(form: any, customer: any) {
    //     if (form.valid) {
    //         this.customerService
    //             .addCustomer(customer)
    //             .retry(3)
    //             .subscribe(result => {
    //                 let newCustomer = result.data + "_" + customer.code;
    //                 this.bindCustomer.emit(newCustomer);
    //                 this.resetForm();
    //                 $('#dialogCustomerAdd-modal').modal('hide');                    
    //             });            
    //     }
    // }
    onAddCustomer(customer) {
        debugger;
        this.slimLoadingBarService.start(() => { });
        this.customerService.addCustomer(customer).retry(3).subscribe(result => {
            debugger;
            if (!result.success) {
                    this.messagesService.error(result.message);
                    return;
                }
            this.messagesService.success(result.message)
            this.navigatorToSearch();
        });
        
    }

    navigatorToSearch() {
        this.customer = {};
        this.slimLoadingBarService.complete();
        $('#dialogCustomerAdd-modal').modal('hide');
        this.messagesService.reloadMainComponent(true); // reload data for main component
        //this.router.navigateByUrl('/vehicleMake/Search');
         $('#dialogCustomerList-modal').modal('show');

    }
    
    private resetForm(): void {
        this.customer = {};
    }

    loadDropdowlistCustomerType() {
        this.customerTypeObjects = [];
        this.customerTypeObjects.push({ label: this.constant.INDIVIDUAL, value: '0' });
        this.customerTypeObjects.push({ label: this.constant.CORPORATE, value: '1' });
        //this.customerTypeObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
    }

}