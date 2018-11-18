import { Component, OnInit } from '@angular/core';
import { ScriptStoreService } from '../script-store.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {

  private scripts = new ScriptStoreService();

  constructor() {}

  ngOnInit() {
    this.scripts.load('tv-static').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

}


