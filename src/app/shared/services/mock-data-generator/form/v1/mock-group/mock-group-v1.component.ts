import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
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
  groupNameControl: FormControl;
  myPath: string[];
  controls: FormArray;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() {}


  checkGroupName()
  {
    appLogger().trace('checking group name: ', {original: this.groupName, current: this.groupNameControl.value});
    if (this.groupName !== this.groupNameControl.value)
    {
      const group = this.element as FormGroup;
      const newValue = {};
      newValue[this.groupNameControl.value.toString().trim()] = this.controls;
      group.controls = newValue;
      group.removeControl(); // triggers change event
    }
  }


  ngOnInit()
  {
    const name = Object.keys(this.element['controls'])[0];
    this.groupName = name;
    this.groupNameControl = new FormControl(name);
    this.myPath = this.path;
    this.myPath.push(name);
    this.controls = this.element['controls'][name] as FormArray;

    appLogger().info('initializing MockGroupV1Component', {
      'groupName': this.groupNameControl, 'myPath': this.myPath, 'controls': this.controls
    });

  }

}
