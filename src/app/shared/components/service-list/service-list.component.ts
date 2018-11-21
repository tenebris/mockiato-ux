import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service} from '../../model/service';


@Component({
  selector: 'app-service-list',
  template: `
    <ag-grid-angular
      style="width: 500px; height: 500px;"
      class="ag-theme-balham"
      [enableSorting]="true"
      [enableFilter]="true"
      [rowData]="services"
      [columnDefs]="columnDefs"
    ></ag-grid-angular>
  `,
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent {

  @Input()
  services: Service[];

  @Output('service')
  serviceEmitter = new EventEmitter<Service>();

  columnDefs = [
    {headerName: 'Name', field: 'name'},
  ];

  selectService(service: Service) {
    this.serviceEmitter.emit(service);
  }


}
