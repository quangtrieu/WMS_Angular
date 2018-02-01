import { Component, OnInit } from '@angular/core';
import { QuantityControlService } from "../services/qualityControl.service";
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'rateJobFF-add-update',
    templateUrl: './addUpdateRateJobFF.component.html',
    styleUrls: ['./addUpdateRateJobFF.style.css']
})

export class AddUpdateRateJobFFComponent implements OnInit {
    private sub: any;
    obj: any
    id: number;
    jobFFItem: any
    subQcList: any
    qcList: any[]
    constructor(private router: Router, private route: ActivatedRoute, private quantityControl: QuantityControlService) { }
    ngOnInit(): void {
        this.jobFFItem = {}
        this.obj = {}
        this.subQcList = {}
        this.qcList = []
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getData()
        });
    }

    getData() {

        this.obj.id = this.id
        this.quantityControl.getJobFF(JSON.stringify(this.obj)).retry(3)
            .subscribe(result => {
                console.log(result);
                this.qcList = []
                if (result.data != null) {
                    this.jobFFItem.RONo = result.data[0].JobFulfilment.RepairOrderMaster.code
                    this.jobFFItem.customer = result.data[0].JobFulfilment.RepairOrderMaster.VehicleCustomer.Customer.name
                    this.jobFFItem.regis = result.data[0].JobFulfilment.RepairOrderMaster.VehicleCustomer.registrationNo
                    result.data.forEach(element => {
                        this.subQcList = {}
                        this.subQcList.id = element.id // set ID 
                        this.subQcList.jobCode = element.RepairOrderJob.JobMaster.code
                        this.subQcList.jobDes = element.RepairOrderJob.JobMaster.description
                        this.subQcList.status = element.jobFulfilmentItemStatusId
                        this.subQcList.remarks = element.remarks == null ? "" : result.data.remarks
                        this.qcList.push(this.subQcList)
                    })
                    console.log(this.qcList)
                }
            });
    }

    addUpdate(obj: any) {
        var filter = obj.filter(select => select.status == 2)
        // .map(select => select.pdEmployeeRoleId)
        if (filter.length == 0) {
            this.router.navigateByUrl('/qualityControl/Update/' + 1);
        } else {
            this.router.navigateByUrl('/qualityControl/Search');
        }
    }

}