import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service, ServiceType} from '../../model/service/service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-service-list',
  template: `
    <div class='serviceListContainer'>
      <ag-grid-angular
        style="width: 100%; height: 500px;"
        class="ag-theme-balham"
        [suppressMovableColumns]="true"
        [enableColResize]="true"
        [enableSorting]="true"
        [enableFilter]="true"
        [rowData]="services"
        [columnDefs]="columnDefinitions"
        (firstDataRendered)="onFirstDataRendered($event)"
        (cellDoubleClicked)="onCellDoubleClicked($event)"
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

  readonly columnDefinitions = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Type', valueGetter: (params) => ServiceType[params.data.type]},
    {headerName: 'Group', field: 'group.name'},
    {headerName: 'Owner', field: 'owner'},
    {
      headerName: 'Last Modified', children: [
        {
          headerName: 'User', valueGetter: (params) => {
            const lastModified = params.data.lastModified;
            return lastModified ? lastModified.user : 'Unavailable';
          }
        },
        {
          headerName: 'When', field: 'lastModified.timestamp',
          filter: 'agDateColumnFilter',
          filterParams: {
            comparator: function (filterLocalDateAtMidnight, cellValue) {
              const dateAsString = cellValue;
              const dateParts = dateAsString.split('/');
              const cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
              if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) return 0;
              if (cellDate < filterLocalDateAtMidnight) return -1;
              if (cellDate > filterLocalDateAtMidnight) return 1;
            },
          },
        }
      ]
    }
  ];


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private router: Router, private route: ActivatedRoute) {}


  onFirstDataRendered(params): void { params.api.sizeColumnsToFit(); }


  onCellDoubleClicked(event): void { this.navigateToServiceDetail(new Service(event.data)); }


  private navigateToServiceDetail(target: Service): void
  {
    console.log(`selected ${target.name}:_id=${target._id}`);
    this.router.navigate(['service', target._id], {relativeTo: this.route});
  }


}
