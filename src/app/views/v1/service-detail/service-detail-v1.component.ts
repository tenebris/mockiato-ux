import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServiceStore} from '../../../shared/model/service/service-store';
import {Service} from '../../../shared/model/service/service';


@Component({
  selector: 'app-view-service-detail',
  templateUrl: './service-detail-v1.component.html',
  styleUrls: ['./service-detail-v1.component.scss']
})
export class ServiceDetailV1Component implements OnInit
{
  found: Service;
  err: any;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private _route: ActivatedRoute, private _store: ServiceStore) { }


  onRequestStop(): void
  {
    this.found.running = false;
    // TODO: execute service call to stop this service
  }


  onRequestStart(): void
  {
    this.found.running = true;
    // TODO: execute service call to stop this service
  }


  ngOnInit()
  {
    this._route.params.subscribe((params) => {
      this._store.getService(params.id)
        .then((data) => {
          this.found = data;
          this.err = null;
        })
        .catch(err => {
          this.found = null;
          this.err = err;
        });
    });
  }

}
