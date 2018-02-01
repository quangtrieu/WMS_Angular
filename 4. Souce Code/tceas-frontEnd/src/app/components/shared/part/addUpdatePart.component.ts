import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: "part-addUpdate",
    templateUrl: './addUpdatePart.component.html',
    styleUrls:['./addUpdatePart.style.css']
})

export class PartAddUpdateComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
    }

    type = true;
    onClick() {
        this.type = !this.type;
    }

}