import { Component, OnInit, Input} from '@angular/core';
declare const jQuery:any;
@Component({
    selector: "dialogNewvp-addUpdate",
    templateUrl: './dialogConfirmAddVehicleProfile.component.html',
    styleUrls:['./dialogConfirmAddVehicleProfile.style.css']
})

export class DialogConfirmAddVehicleProfile implements OnInit {
   
    constructor() { }

    ngOnInit(): void {
        
    }
   
   onClick(){
       jQuery('#dialogVehicleProfileAdd-modal').modal('show');
   }

}