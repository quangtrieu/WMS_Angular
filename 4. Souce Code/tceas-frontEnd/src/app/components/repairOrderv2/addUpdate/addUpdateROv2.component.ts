import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepairOrder } from "../models/repairOrder.model";
import { DummyData } from "../../../../dummydata/dummydata";

declare var $: any;
declare const jQuery: any;
@Component({
    selector: "ROv2-addUpdate",
    templateUrl: './addUpdateROv2.component.html',
    styleUrls: ['./addUpdateROv2.style.css']
})

export class ROv2AddUpdateComponent implements OnInit {
    id: string = null;
    @Input() repairOrder: RepairOrder;
    private sub: any;
    dummyData: DummyData;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];

            if(params["regId"]!=null || params['id']!=null){
                this.dummyData = new DummyData();
            }
        });

        this.repairOrder = new RepairOrder();
        if (this.id != null) {
            this.repairOrder.isUpdate = true;
            var items = this.dummyData.repairOrderList.filter(i=>i.repairOrderNo == this.id);
            if(items.length > 0)
               this.dummyData.repairOrder = items[0];
        }

    }

    openModal() {
        jQuery('#dialogNewVP-modal').modal('show');
    }

    type = true;
    onClick() {
        this.type = !this.type;
    }
}