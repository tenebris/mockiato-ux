import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import * as moment from 'moment';

import {ServiceStore} from '../../../shared/model/service/service-store';
import {Service, ServiceType} from '../../../shared/model/service/service';
import {LastModifiedDetail} from '../../../shared/model/common/last-modified-detail';
import {appLogger} from '../../../shared/app-logger';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-browse-system-v2',
  templateUrl: './browse-system-v2.component.html',
  styleUrls: ['./browse-system-v2.component.scss']
})
export class BrowseSystemV2Component implements OnInit
{
  readonly displayedColumns: string[] = ['name', 'type', 'group', 'owner', 'when'];
  readonly filterControl = new FormControl('');
  dataSource: MatTableDataSource<Service>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private serviceStore: ServiceStore, private changeDetectorRef: ChangeDetectorRef)
  { this.dataSource = new MatTableDataSource([]); }


  doRefreshServices() { this.serviceStore.publishDummyData(); }


  typeName(type: ServiceType): string { return ServiceType[type]; }


  formatDate(detail: LastModifiedDetail): string
  { return detail ? moment(detail.timestamp).format('lll [GMT]Z') : ''; }


  applyFilter(filterValue: string)
  { this.dataSource.filter = filterValue.trim().toLowerCase(); }


  private _configureDataSource()
  {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (t: Service, filter: string): boolean => {
      return t && t.name.toLowerCase().indexOf(filter) >= 0
             || t.group.name.toLowerCase().indexOf(filter) >= 0
             || ServiceType[t.type].toLocaleLowerCase().indexOf(filter) >= 0;
    };
  }


  ngOnInit()
  {
    this.serviceStore.services.subscribe((t) => {
      appLogger().debug('detected service list update', t);
      this.dataSource = new MatTableDataSource(t);
      this._configureDataSource();

      this.filterControl.setValue('');
      this.changeDetectorRef.detectChanges();
    });
  }
}
