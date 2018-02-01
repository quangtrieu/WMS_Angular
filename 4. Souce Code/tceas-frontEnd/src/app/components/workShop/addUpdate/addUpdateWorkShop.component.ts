import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workshop } from '../models/workshop.model';

declare var $: any;

@Component({
    selector: "workShop-addUpdate",
    templateUrl: './addUpdateWorkShop.component.html',
    styleUrls: ['./addUpdateWorkShop.style.css']
})

export class WorkShopAddUpdateComponent implements OnInit {
    workshop: Workshop
    id: number
    sub: any

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        this.workshop = new Workshop();
        this.workshop.isUpdate = false;        
        if (this.id) {
            this.workshop.isUpdate = true;
        }
    }
    

}