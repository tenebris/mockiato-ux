import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {appLogger} from '../../../../../app-logger';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-mock-data-structure',
  templateUrl: './mock-data-structure.component.html',
  styleUrls: ['./mock-data-structure.component.scss']
})
export class MockDataStructureComponent implements OnInit
{

  @Input() builder: FormArray;
  @Input() structure: FormControl;


  // ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() {}


  doAddRootElement(): void
  {
    this.builder.push(new FormGroup({
      name: new FormControl('f' + (this.builder.length + 1)),
      type: new FormControl(undefined)
    }));
  }


  onDrop(event: CdkDragDrop<string[]>)
  {
    // capture the current builder value
    const builder = this.builder.value;

    // move both the control and the value in their respective arrays
    moveItemInArray(this.builder.controls, event.previousIndex, event.currentIndex);
    moveItemInArray(builder, event.previousIndex, event.currentIndex);

    // rebuild the structure given the changes
    const newStructure = {};
    for (const item of builder) newStructure[item.name] = item.type;

    appLogger().debug('new structure: ' + JSON.stringify(newStructure));
    this.structure.setValue(newStructure);
  }


  ngOnInit()
  {
    /* FIXME (otter): move this to a service which creates the FormGroup
           doing it here causes issues with ExpressionChangedAfterItHasBeenCheckedError */

    if (this.structure.value)
    {
      const current = this.structure.value;
      appLogger().debug('initializing MockDataStructureComponent with value', current);

      for (const i of Object.keys(current))
      {
        appLogger().debug('adding element', i);
        this.builder.push(new FormGroup({
          name: new FormControl(i),
          type: new FormControl(current[i])
        }));
      }

    }

  }
}
