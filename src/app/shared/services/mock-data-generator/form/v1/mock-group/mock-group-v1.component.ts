import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';
import {appLogger} from '../../../../../app-logger';


@Component({
  selector: 'app-mock-group-v1',
  templateUrl: './mock-group-v1.component.html',
  styleUrls: ['./mock-group-v1.component.scss']
})
export class MockGroupV1Component implements OnInit
{
  @Input() element: FormControl;
  @Input() structure: FormControl;
  @Input() path: string[];

  @Output() elementRemoved = new EventEmitter<object>();

  groupName: string;
  myPath: string[];
  controls: FormArray;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() {}


  ngOnInit()
  {
    this.groupName = Object.keys(this.element['controls'])[0];
    this.myPath = this.path;
    this.myPath.push(this.groupName);
    this.controls = this.element['controls'][this.groupName] as FormArray;

    appLogger().info('initializing MockGroupV1Component', {
      'groupName': this.groupName, 'myPath': this.myPath, 'controls': this.controls});

  }

}
