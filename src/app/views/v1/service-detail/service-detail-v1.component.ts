import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServiceStore} from '../../../shared/model/service/service-store';
import {Service} from '../../../shared/model/service';


@Component({
  selector: 'app-service-detail-v1',
  templateUrl: './service-detail-v1.component.html',
  styleUrls: ['./service-detail-v1.component.scss']
})
export class ServiceDetailV1Component implements OnInit
{
  found: Service;
  err: any;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private _route: ActivatedRoute, private _store: ServiceStore) { }


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
