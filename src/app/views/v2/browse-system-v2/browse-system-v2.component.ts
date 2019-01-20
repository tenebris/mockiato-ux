import {Component, OnInit} from '@angular/core';
import {ServiceStore} from '../../../shared/model/service/service-store';
import {Service} from '../../../shared/model/service/service';
import {appLogger} from '../../../shared/app-logger';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-browse-system-v2',
  templateUrl: './browse-system-v2.component.html',
  styleUrls: ['./browse-system-v2.component.scss']
})
export class BrowseSystemV2Component implements OnInit
{

  readonly clickThroughHandler: (Service) => void;

  // ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(public serviceStore: ServiceStore, private router: Router, private route: ActivatedRoute)
  {
    this.clickThroughHandler = (target: Service) => {
      appLogger().debug('click event', target);
      this._navigateToServiceDetail(target);
    };
  }


  doRefreshServices() { this.serviceStore.publishLargeDummyDataSet(); }


  private _navigateToServiceDetail(target: Service): void
  {
    appLogger().debug(`selected ${target.name}:_id=${target._id}`);
    this.router.navigate(['service', target._id], {relativeTo: this.route});
  }


  ngOnInit(): void {}
}
