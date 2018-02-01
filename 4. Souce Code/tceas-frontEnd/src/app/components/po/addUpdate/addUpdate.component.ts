import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms/forms";
import { POService } from "../services/po.service";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
    selector: "po-addUpdate",
    templateUrl: './addUpdate.component.html',
    styleUrls: ['./addUpdate.style.css']
})

export class POAddUpdateComponent implements OnInit {

    constructor(private route: ActivatedRoute,
        private router: Router,
        private service: POService,
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