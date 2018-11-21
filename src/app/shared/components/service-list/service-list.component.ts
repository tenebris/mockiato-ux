import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service, ServiceType} from '../../model/service';


@Component({
  selector: 'app-service-list',
  template: `
    <div class='serviceListContainer'>
      <ag-grid-angular
        style="width: 100%; height: 500px;"
        class="ag-theme-balham"
        [enableColResize]="true"
        [enableSorting]="true"
        [enableFilter]="true"
        [rowData]="services"
        [columnDefs]="columnDefinitions"
        (firstDataRendered)="onFirstDataRendered($event)"
      ></ag-grid-angular>
    </div>
  `,
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent
{

  @Input()
  services: Service[];

  @Output('service')
  serviceEmitter = new EventEmitter<Service>();

  columnDefinitions = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Type', valueGetter: (params) => ServiceType[params.data.type]},
    {headerName: 'Owner', field: 'owner'},
    {
      headerName: 'Last Modified', children: [
        {headerName: 'User', field: 'lastModified.user'},
        {
          headerName: 'When', field: 'lastModified.timestamp',
          filter: 'agDateColumnFilter',
          filterParams: {
            comparator: function (filterLocalDateAtMidnight, cellValue) {
              const dateAsString = cellValue;
              const dateParts = dateAsString.split('/');
              const cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
              if (filterLocalDateAtMidnight.getTime() === cellDate.getTime())
              {
                return 0;
              }
              if (cellDate < filterLocalDateAtMidnight)
              {
                return -1;
              }
              if (cellDate > filterLocalDateAtMidnight)
              {
                return 1;
              }
            },
          },
        }
      ]
    }
  ];

  onFirstDataRendered(params)
  {
    params.api.sizeColumnsToFit();
  }

  selectService(service: Service)
  {
    this.serviceEmitter.emit(service);
  }


}
