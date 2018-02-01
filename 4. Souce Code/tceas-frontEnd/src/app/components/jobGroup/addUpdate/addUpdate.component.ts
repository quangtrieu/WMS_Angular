import { Component, OnInit, Input } from '@angular/core';
import { JobGroupService } from "../services/jobGroup.service";
import { Router } from '@angular/router';
declare var $: any;

@Component({
    selector: "jobGroup-addUpdate",
    templateUrl: './addUpdate.component.html', providers: []
})

export class JobGroupAddUpdateComponent implements OnInit {
    @Input() jobGroup: any = {};

    constructor(private router: Router,
        private jobGroupService: JobGroupService) { }

    ngOnInit(): void {
        if (this.jobGroup == null) {
            this.jobGroup = {};
        }
    }

    addUpdate(form: any) {
        form._submitted = true;
        if (form.valid) {
            if (this.jobGroup.id == null) {
                this.jobGroupService.add(this.jobGroup).subscribe(result => {
                    if (result.success == 1){
                        $('#add-update-job-group-modal').modal('hide');
                        location.reload();
                    }
                    else
                        this.jobGroup.errorMessage = result.message;
                })
            }
            else {
                this.jobGroupService.update(this.jobGroup).subscribe(result => {
                    if (result.success == 1) {
                        $('#add-update-job-group-modal').modal('hide');
                        location.reload();
                    }
                    else
                        this.jobGroup.errorMessage = result.message;
                })
            }
        }
    }
}