import {Component, OnInit} from '@angular/core';
import {ScriptStoreService} from '../../../shared/services/script-store/script-store.service';
import {ActivatedRoute} from '@angular/router';
import {appLogger} from '../../../shared/app-logger';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit
{

  here: string;
  private _scripts = new ScriptStoreService();


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~
  constructor(route: ActivatedRoute)
  {
    this.here = '/' + route.snapshot.url.join('/');
  }


  ngOnInit()
  {
    this._scripts.load('tv-static').then(data => {
      appLogger().debug('script loaded ', data);
    }).catch(error => appLogger().error(error));
  }

}


