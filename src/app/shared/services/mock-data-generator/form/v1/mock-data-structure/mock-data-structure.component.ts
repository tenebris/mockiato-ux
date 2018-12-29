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
    const formGroup = new FormGroup({
      name: new FormControl('f' + (this.builder.length + 1)),
      type: new FormControl(undefined)
    });
    formGroup.valueChanges.subscribe(() => this.doRebuildStructure());
    this.builder.push(formGroup);
  }


  onDrop(event: CdkDragDrop<string[]>)
  {
    appLogger().trace('drop event: ', event);

    // move both the control and the value in their respective arrays
    moveItemInArray(this.builder.controls, event.previousIndex, event.currentIndex);

    const newStructure = {};
    for (const control of this.builder.controls)
    {
      const item = control.value;
      newStructure[item.name] = item.type;
    }

    appLogger().trace('new structure: ' + JSON.stringify(newStructure));
    this.structure.setValue(newStructure);
  }


  doRebuildControls()
  {
    const current = this.structure.value;
    appLogger().trace('initializing MockDataStructureComponent with value', current);

    const builderArray = new FormArray([]);
    for (const i of Object.keys(current))
    {
      appLogger().trace('adding element', i);
      builderArray.push(new FormGroup({
        name: new FormControl(i),
        type: new FormControl(current[i])
      }));
    }

    builderArray.valueChanges.subscribe(() => this.doRebuildStructure());


    this.builder.controls = builderArray.controls;
  }


  doRebuildStructure()
  {
    appLogger().debug(
      'value change on builder' + (this.builder.valid ? ': ' : ' [invalid]: ')
      , this.builder.controls);

    const newStructure = {};
    for (const control of this.builder.controls)
    {
      const item = control.value;
      newStructure[item.name] = item.type;
    }

    appLogger().debug('new structure: ' + JSON.stringify(newStructure));
    this.structure.setValue(newStructure);
  }


  /** determine if the builder is in sync with the current structure */
  private doCheckBuilderSync(): boolean
  {
    const current = this.structure.value;
    const controls = this.builder.controls;

    appLogger().trace('checking synchronization of builder', current, controls);

    const numControls = Object.keys(current).length;
    if (numControls !== controls.length) return false;

    let i = 0;
    for (const key of Object.keys(current))
    {
      const item = controls[i++].value;
      appLogger().trace('checking sync', item, key, current[key]);
      if (!(item.name === key && item.type === current[key]))
      {
        appLogger().debug('found mismatch', key, current[key], item);
        return false;
      }
    }

    // if we made it to here everything matches...
    return true;
  }


  ngOnInit()
  {
    if (this.structure.value)
    { this.doRebuildControls(); }
    this.structure.valueChanges.subscribe(() => {
      const syncState = this.doCheckBuilderSync();
      appLogger().debug('synchronized?', syncState);

      // nothing to do if we are in sync with the structure
      if (!syncState) this.doRebuildControls();
    });
  }
}
