import { Component, OnInit, Input } from '@angular/core';
import { Import } from "../models/import.model";

@Component({
  selector: 'import-common',
  templateUrl: './import.component.html'
})

export class ImportComponent implements OnInit {

  @Input() import: Import;
  ngOnInit(): void {
    if (this.import == null) {
      this.import = new Import()
    } 
  }
}
