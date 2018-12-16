import {Component, OnInit} from '@angular/core';
import {ServiceStore} from '../../../shared/model/service/service-store';

@Component({
  selector: 'app-view-browse-system-v1',
  templateUrl: './browse-system-v1.component.html',
  styleUrls: ['./browse-system-v1.component.scss'],
})
export class BrowseSystemV1Component implements OnInit
{
  constructor(public serviceStore: ServiceStore){}

  ngOnInit() {}

  refreshServices() {
    this.serviceStore.publishDummyData();
  }

}
