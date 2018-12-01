import {Component, Input, OnInit} from '@angular/core';
import {RRPair} from '../../model/rr-pair';


@Component({
  selector: 'app-rrpair-list',
  template: `
    <div class="rrpair-list">
      <app-rrpair *ngFor="let pair of data" [data]="pair"></app-rrpair>
    </div>
  `,
  styleUrls: ['./rrpair-list.component.scss']
})
export class RRPairListComponent implements OnInit
{

  @Input() data: RRPair[];


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() { }


  ngOnInit() {}

}
