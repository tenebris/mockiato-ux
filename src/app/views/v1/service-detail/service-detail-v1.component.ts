import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServiceStore} from '../../../shared/model/service/service-store';
import {appLogger} from '../../../shared/app-logger';


@Component({
  selector: 'app-service-detail-v1',
  templateUrl: './service-detail-v1.component.html',
  styleUrls: ['./service-detail-v1.component.scss']
})
export class ServiceDetailV1Component implements OnInit
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private _route: ActivatedRoute, private _store: ServiceStore) { }


  ngOnInit()
  {
    this._route.params.subscribe((params) => {
      const found = this._store.getService(params.id);
      // FIXME (otter): appLogger().debug(found);
    });
  }

}
