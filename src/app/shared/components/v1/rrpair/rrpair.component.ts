import {Component, Input, OnInit} from '@angular/core';
import {RRPair} from '../../../model/rr-pair';
import {appLogger} from '../../../app-logger';


@Component({
  selector: 'app-rrpair',
  template: `
    <div class="rrpair">
      <p>rrpair: {{data.path}}&nbsp;
        <fa-icon icon="edit" (click)="onEnableEdit()"></fa-icon>&nbsp;
        <fa-icon icon="trash-alt" (click)="onRemove()"></fa-icon>&nbsp;
        <fa-icon icon="question-circle" (click)="onShowInfo()"></fa-icon>&nbsp;
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

  onEnableEdit(): void {
    // TODO: use modal to edit this specific RR-Pair
    //  alternatively this could enable in-line editing...
    appLogger().warn('enableEdit: not implemented yet');
  }

  onRemove(): void {
    // TODO: use modal to confirm removal of this specific RR-Pair
    appLogger().warn('remove: not implemented yet');
  }

  onShowInfo(): void {
    // TODO: use modal or pop-up to display information about specific RR-Pair
    appLogger().warn('showInfo: not implemented yet');
  }

}
