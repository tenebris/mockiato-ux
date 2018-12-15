import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-mock-type-select',
  template: `
    <div class="form-group">
      <label for="fileType">File Type</label>
      <select class="form-control" id="fileType"
              required [(ngModel)]="model.type" name="fileType" #fileType="ngModel">
        <option *ngFor="let type of _supportedTypes" [value]="type">{{type}}</option>
      </select>
      <div [hidden]="fileType.valid || fileType.pristine"
           class="alert alert-danger">
        File type is required
      </div>
    </div>
  `,
  styleUrls: ['./mock-type-select.component.scss']
})
export class MockTypeSelectComponent implements OnInit
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() {}


  ngOnInit() {}

}
