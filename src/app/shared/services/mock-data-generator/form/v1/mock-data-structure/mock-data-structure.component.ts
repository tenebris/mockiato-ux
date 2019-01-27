import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {appLogger} from '../../../../../app-logger';


function _isNestedGroup(element: AbstractControl): boolean
{
  // check if the first element in the group is a FormArray
  // if it is not then we are a simple element group
  return element instanceof FormGroup
         ? element.controls[Object.keys(element.controls)[0]] instanceof FormArray
         : false;
}


function _buildStructure(structure: object, controls: AbstractControl[]): void
{
  appLogger().trace('building structure', structure, controls);

  for (const control of controls)
  {
    if (_isNestedGroup(control))
    {
      appLogger().trace('building structure: found nested control', control);

      const group = control as FormGroup;
      const name = Object.keys(group.controls)[0];

      const subStructure = {};
      structure[name] = subStructure;

      const children = group.controls[name] as FormArray;
      _buildStructure(subStructure, children.controls);
      continue;
    }

    const item = control.value;
    structure[item.name] = item.type;
  }
}


@Component({
  selector: 'app-mock-data-structure',
  templateUrl: './mock-data-structure.component.html',
  styleUrls: ['./mock-data-structure.component.scss']
})
export class MockDataStructureComponent implements OnInit
{

  @Input() builder: FormArray;
  @Input() structure: FormControl;
  @Input() path: string[];


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
    this.rebuildStructure();
  }


  /**
   * Builds the list of FormControls which represent the mock-data structure.
   *
   * @param context of generation.  Only passed when called recursively by itself.
   */
  doRebuildControls(context?: { controls: FormArray, structure: object }): void
  {
    let _structure, _controls;

    // check if we are processing a sub-context of the structure
    // if we are then take the values from that otherwise from the root
    if (context)
    {
      _controls = context.controls;
      _structure = context.structure;
    } else
    {
      _controls = new FormArray([]);
      _structure = this.structure.value; // FIXME (otter): need to take into account this.path
    }

    appLogger().trace('initializing MockDataStructureComponent with value', _structure, _controls);

    // process each key of the current structure context
    for (const key of Object.keys(_structure))
    {
      appLogger().trace('adding element', key);
      switch (typeof _structure[key])
      {
        case 'string':
          _controls.push(new FormGroup({
            name: new FormControl(key),
            type: new FormControl(_structure[key])
          }));
          break;

        case 'object':
          appLogger().trace('processing children for element: ', key);
          const children = new FormArray([]);

          // need to name the children to match the group
          const data = {};
          data[key] = children;

          _controls.push(new FormGroup(data));
          this.doRebuildControls({controls: children, structure: _structure[key]});
          break;

        default:
          appLogger().trace('unknown type found for value of key: ', key, typeof _structure[key]);
      }
    }

    // check if we are in the root context
    // if so, wrap up and subscribe to any future changes
    if (!context)
    {
      appLogger().debug('finalizing structure', _structure, _controls);
      _controls.valueChanges.subscribe(() => this.doRebuildStructure());
      this.builder.controls = _controls.controls;
    }
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
    this.structure.setValue(newStructure);  // FIXME (otter): need to take into account this.path
  }


  onElementRemoved(element: object): void
  {
    appLogger().debug('detected remove element event', element);

    this.builder.controls = this.builder.controls.filter(x => x.value !== element);
    this.rebuildStructure();
  }


  isSimpleElementGroup(element: AbstractControl): boolean
  { return !_isNestedGroup(element); }


  private rebuildStructure(): void
  {
    appLogger().trace('starting rebuild of root structure', this.builder.controls);

    const newStructure = {};
    _buildStructure(newStructure, this.builder.controls);

    appLogger().trace('new structure: ' + JSON.stringify(newStructure));
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

      // FIXME (otter): adjust logic to do a deep check... currently only looks at root children

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
    appLogger().info('initializing MockDataStructureComponent', {
      path: this.path,
      structure: this.structure,
      builder: this.builder
    });

    if (this.path && this.path.length > 0)
    {
      appLogger().info(this.structure.value[this.path]);
    } else
    {
      // FIXME (otter): in block for debugging purposes...

      if (!this.path) this.path = [];
      if (this.structure.value) { this.doRebuildControls(); }

      this.structure.valueChanges.subscribe(() => {
        const syncState = this.doCheckBuilderSync();
        appLogger().debug('synchronized?', syncState);

        // nothing to do if we are in sync with the structure
        if (!syncState) this.doRebuildControls();
      });
    }

  }
}
