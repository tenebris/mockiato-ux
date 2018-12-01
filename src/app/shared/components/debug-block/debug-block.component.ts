import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';

// TODO: prettify and make these blocks collapsible and nicely offset

@Component({
  selector: 'app-debug-block',
  template: `
    <div class="debug-block" *ngIf="!env.production">
      <em>Debug Information</em>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./debug-block.component.scss']
})
export class DebugBlockComponent implements OnInit
{

  readonly env = environment;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() { }


  ngOnInit() {}

}
