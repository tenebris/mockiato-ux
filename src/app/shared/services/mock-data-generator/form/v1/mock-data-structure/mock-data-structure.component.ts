import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {appLogger} from '../../../../../app-logger';


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
      type: new FormControl('name')
    }));
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
