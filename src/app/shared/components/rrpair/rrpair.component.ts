import {Component, Input, OnInit} from '@angular/core';
import {RRPair} from '../../model/rr-pair';


@Component({
  selector: 'app-rrpair',
  template: `
    <div class="rrpair">
      <p>rrpair: {{data.path}}</p>
    </div>
  `,
  styleUrls: ['./rrpair.component.scss']
})
export class RRPairComponent implements OnInit
{

  @Input() data: RRPair;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() { }


  ngOnInit()
  {
  }

}
