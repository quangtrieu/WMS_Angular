import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkBayService } from "../services/workBay.service";
declare var $: any;

@Component({
    selector: "workbay-addUpdate",
    templateUrl: './addUpdateWorkBay.component.html',
    styleUrls: ['./addUpdateWorkBay.style.css']
})

export class WorkBayAddUpdateComponent implements OnInit {
    @Input() workBay: any = {};
    hoistList = [];
    bayTypeList = [];
    employeeList = [];
    bayEmployee1 = {};
    bayEmployee2 = {};
    private employee;

    constructor(private workBayService: WorkBayService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.workBay.PDJobType = {};
        this.workBay.PDHoistType = {};
        this.workBay.bayEmployee1 = {};
        this.workBay.bayEmployee2 = {};

        this.workBayService.getHoist().retry(3).subscribe(result => {
            this.hoistList = result.data
        })

        this.workBayService.getBayType().retry(3).subscribe(result => {
            this.bayTypeList = result.data
        })

        this.workBayService.getEmployee().retry(3).subscribe(result => {
            this.employeeList = result.data
        })
    }

    addUpdate(obj) {

        if (obj.id) {
            this.employee = []
            if (obj.bayEmployee1) {
                this.employee.push(obj.bayEmployee1)
            }
            if (obj.bayEmployee2) {
                this.employee.push(obj.bayEmployee2)
            }
            obj.employee = this.employee
            console.log(obj)
            this.workBayService
                .update(JSON.stringify(obj))
                .retry(3)
                .subscribe(result => {
                    console.log('Update done')
                    $('#workbay-modal').modal('hide');
                    this.router.navigateByUrl('/workBay/Search');
                });
        } else {
            this.employee = []
            if (obj.bayEmployee1) {
                this.employee.push(obj.bayEmployee1)
            }
            if (obj.bayEmployee2) {
                this.employee.push(obj.bayEmployee2)
            }
            obj.employee = this.employee
            console.log(obj)
            this.workBayService
                .add(JSON.stringify(obj))
                .retry(3)
                .subscribe(result => {
                    console.log('Add done')
                    $('#workbay-modal').modal('hide');
                    this.router.navigateByUrl('/workBay/Search');
                });
        }

    }
}