import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-mock-group-v1',
  templateUrl: './mock-group-v1.component.html',
  styleUrls: ['./mock-group-v1.component.scss']
})
export class MockGroupV1Component implements OnInit
{
  @Input() element: FormControl;
  @Output() elementRemoved = new EventEmitter<object>();


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() { }


  ngOnInit()
  {
  }

}
