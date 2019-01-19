import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import * as moment from 'moment';

import {ServiceStore} from '../../../shared/model/service/service-store';
import {Service, ServiceType} from '../../../shared/model/service/service';


@Component({
  selector: 'app-browse-system-v2',
  templateUrl: './browse-system-v2.component.html',
  styleUrls: ['./browse-system-v2.component.scss']
})
export class BrowseSystemV2Component implements OnInit
{
  readonly displayedColumns: string[] = ['name', 'type', 'group', 'owner', 'when'];
  readonly dataSource: ServiceDataSource;

  @ViewChild(MatSort) sort: MatSort;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(public serviceStore: ServiceStore)
  {
    this.dataSource = new ServiceDataSource(serviceStore);
  }


  doRefreshServices() { this.serviceStore.publishDummyData(); }


  typeName(type: ServiceType): string { return ServiceType[type]; }


  formatDate(timestamp: Date): string
  {
    return moment(timestamp).format('lll [GMT]Z');
  }


  ngOnInit()
  {
    this.dataSource.sort = this.sort;
  }
}


export class ServiceDataSource extends MatTableDataSource<Service>
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private store: ServiceStore)
  {
    super(store.getCurrentServiceList());
  }
}

