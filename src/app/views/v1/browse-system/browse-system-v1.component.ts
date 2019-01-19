import {Component, OnInit} from '@angular/core';
import {ServiceStore} from '../../../shared/model/service/service-store';


@Component({
  selector: 'app-view-browse-system',
  templateUrl: './browse-system-v1.component.html',
  styleUrls: ['./browse-system-v1.component.scss'],
})
export class BrowseSystemV1Component implements OnInit
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(public serviceStore: ServiceStore) {}


  refreshServices()
  {
    this.serviceStore.publishDummyData();
  }


  ngOnInit() {}

}
