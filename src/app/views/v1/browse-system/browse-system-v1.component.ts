import {Component, OnInit} from '@angular/core';
import {ServiceListService} from '../../../shared/services/core/service-list.service';
import {Service} from '../../../shared/model/service';
import {ServiceStore} from '../../../shared/model/service-store';

@Component({
  selector: 'app-browse-system-v1',
  templateUrl: './browse-system-v1.component.html',
  styleUrls: ['./browse-system-v1.component.scss'],
  providers: [ServiceStore]
})
export class BrowseSystemV1Component implements OnInit
{
  constructor(public serviceStore: ServiceStore){}

  ngOnInit() {}

  selectService(data: any) {
    console.log(data);
  }

  refreshServices() {
    this.serviceStore.test();
  }

}
