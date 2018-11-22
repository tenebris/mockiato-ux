import {Component, OnInit} from '@angular/core';
import {ScriptStoreService} from '../../../shared/services/script-store/script-store.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit
{

  private _scripts = new ScriptStoreService();
  protected here: string;

  constructor(route: ActivatedRoute)
  {
    this.here = '/' + route.snapshot.url.join('/');
  }

  ngOnInit()
  {
    this._scripts.load('tv-static').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

}


