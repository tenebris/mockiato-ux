import {Component, Input, OnInit} from '@angular/core';
import {RRPair} from '../../model/rr-pair';


@Component({
  selector: 'app-rrpair',
  template: `
    <div class="rrpair">
      <p>rrpair: {{data.path}}&nbsp;
        <fa-icon icon="edit"></fa-icon>&nbsp;
        <fa-icon icon="trash-alt"></fa-icon>&nbsp;
      </p>
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
