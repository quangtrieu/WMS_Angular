import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkshopPersonnel } from '../models/workshopPersonnel.model';
import { WorkShopPersonnelService } from "../services/workShopPersonnel.service";

declare var $: any;

@Component({
    selector: "workshopPersonnel-addUpdate",
    templateUrl: './addUpdateWorkshopPersonnel.component.html',
    styleUrls: ['./addUpdateWorkshopPersonnel.style.css']
})

export class WorkshopPersonnelAddUpdateComponent implements OnInit {
    appointment: WorkshopPersonnel
    id: number
    sub: any
    selectedWorkPersonnel = {}
    roleList = []
    checkedList = []

    constructor(private route: ActivatedRoute, private workShopPersonnelService: WorkShopPersonnelService, private router: Router) { }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });



        this.appointment = new WorkshopPersonnel();
        this.appointment.isUpdate = false;
        if (this.id) {
            this.appointment.isUpdate = true;
            this.workShopPersonnelService.getById(this.id).retry(3)
                .subscribe(result => {
                    this.selectedWorkPersonnel = result.data
                    this.checkedList = result.data.EmployeeRoles.filter(select => select.checked)
                        .map(select => select.pdEmployeeRoleId)
                    this.bindListRole(this.checkedList);
                })
        } else {
            this.bindListRole(null);
        }
    }

    bindListRole(listRoleChecked) {
        this.workShopPersonnelService.getRole().retry(3)
            .subscribe(result => {
                if (listRoleChecked != null) {
                    result.data.forEach(item => {
                        var newItem = item;
                        for (var i = 0; i <= listRoleChecked.length; i++) {
                            var subItem = listRoleChecked[i];
                            if (subItem == newItem.id) {
                                newItem.isChecked = true;
                                break;
                            } else {
                                newItem.isChecked = false;
                            }
                        }
                        this.roleList.push(newItem);
                    });
                } else {
                    this.roleList = result.data;
                }
            })
    }

    addUpdate(obj) {
        if (obj.id) {
            var listChecked = this.roleList.filter(element => element.isChecked)
            obj.EmployeeRoles = listChecked
            console.log(obj)
            this.workShopPersonnelService.update(JSON.stringify(obj)).retry(3)
                .subscribe(result => {
                    this.router.navigate(['/workshopPersonnel/Search']);
                })
        } else {
            var listChecked = this.roleList.filter(element => element.isChecked)
            obj.EmployeeRoles = listChecked
            console.log(obj)
            this.workShopPersonnelService.create(JSON.stringify(obj)).retry(3)
                .subscribe(result => {
                    this.router.navigate(['/workshopPersonnel/Search']);
                })
        }
    }

    checkbox(item) {
        item.isChecked = (item.isChecked) ? false : true;
    }

    btnBack() {
        this.router.navigate(['/workshopPersonnel/Search']);
    }
}