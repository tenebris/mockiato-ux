import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import * as moment from 'moment';

import {ServiceStore} from '../../../shared/model/service/service-store';
import {Service, ServiceType} from '../../../shared/model/service/service';
import {LastModifiedDetail} from '../../../shared/model/common/last-modified-detail';
import {appLogger} from '../../../shared/app-logger';


@Component({
  selector: 'app-browse-system-v2',
  templateUrl: './browse-system-v2.component.html',
  styleUrls: ['./browse-system-v2.component.scss']
})
export class BrowseSystemV2Component implements OnInit
{
  readonly displayedColumns: string[] = ['name', 'type', 'group', 'owner', 'when'];
  dataSource: MatTableDataSource<Service>;

  @ViewChild(MatSort) sort: MatSort;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private serviceStore: ServiceStore, private changeDetectorRef: ChangeDetectorRef)
  { this.dataSource = new MatTableDataSource(serviceStore.getCurrentServiceList()); }


  doRefreshServices() { this.serviceStore.publishDummyData(); }


  typeName(type: ServiceType): string { return ServiceType[type]; }


  formatDate(detail: LastModifiedDetail): string
  { return detail ? moment(detail.timestamp).format('lll [GMT]Z') : ''; }


  private _configureDataSource()
  { this.dataSource.sort = this.sort; }


  ngOnInit()
  {
    this._configureDataSource();

    this.serviceStore.services.subscribe((t) => {
      appLogger().debug('detected service list update', t);
      this.dataSource = new MatTableDataSource(t);
      this._configureDataSource();
      this.changeDetectorRef.detectChanges();
    });
  }
}
