import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms/forms";
import { StockAdjustmentService } from "../services/stockAdjustment.service";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
    selector: "grn-addUpdate",
    templateUrl: './addUpdate.component.html',
    styleUrls: ['./addUpdate.style.css']
})

export class StockAdjustmentAddUpdateComponent implements OnInit {

    constructor(private route: ActivatedRoute,
        private router: Router,
        private service: StockAdjustmentService,
        private slimLoadingBarService: SlimLoadingBarService) { }
    
    pdData: any;
    id: number;
    private sub: any;
    customer: any;

    ngOnInit(): void {
        this.customer = {};
        this.pdData = {};

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        // get pd data
        this.service
            .getPDData()
            .retry(3)
            .subscribe(result => {
                this.pdData = result.data;
                console.log(this.pdData);
            });
        
        if (this.id) {
            this.service
                .getCustomer(this.id)
                .retry(3)
                .subscribe(result => {
                    this.customer = result.data;
                });

        }
    }

    addUpdate(objCustomer) {
        this.slimLoadingBarService.start(() => { });
        if (objCustomer.id) {
            this.service
                .updateCustomer(objCustomer)
                .retry(3)
                .subscribe(result => {
                    console.log(result);
                    this.onCompleted();
                });
        } else {
            this.service
                .addCustomer(objCustomer)
                .retry(3)
                .subscribe(result => {
                    console.log(result);
                    this.onCompleted();
                });
        }
    }

    onCompleted() {
        this.slimLoadingBarService.complete();
        this.router.navigate(['/customer/Search']);
    }

    type = true;
    toggle() {
        this.type = !this.type;
    }
}