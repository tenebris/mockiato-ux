import {Component, OnInit} from '@angular/core';
import {ServiceStore} from '../../../shared/model/service/service-store';
import {ServiceType} from '../../../shared/model/service/service';
import * as moment from 'moment';

@Component({
  selector: 'app-browse-system-v2',
  templateUrl: './browse-system-v2.component.html',
  styleUrls: ['./browse-system-v2.component.scss']
})
export class BrowseSystemV2Component implements OnInit
{
  displayedColumns: string[] = ['name', 'type', 'group', 'owner', 'when'];


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(public serviceStore: ServiceStore) {}


  doRefreshServices() { this.serviceStore.publishDummyData(); }


  typeName(type: ServiceType): string { return ServiceType[type]; }


  formatDate(timestamp: Date): string
  {
    return moment(timestamp).format('lll [GMT]Z');
  }


  ngOnInit() {}


}
