import { Component, OnInit } from '@angular/core';
import {ServiceListService} from '../services/core/service-list.service';

@Component({
  selector: 'app-browse-system-v1',
  templateUrl: './browse-system-v1.component.html',
  styleUrls: ['./browse-system-v1.component.scss']
})
export class BrowseSystemV1Component implements OnInit {

  constructor(private serviceListSrv: ServiceListService) { }

  ngOnInit() {
    // TODO: map these to output grid...
    // TODO: change to get "recent" and "favorite" services on init
    // HACK: this is mostly here for a break-point for initial connectivity testing :D
    this.serviceListSrv.getAllServices();
  }

}
