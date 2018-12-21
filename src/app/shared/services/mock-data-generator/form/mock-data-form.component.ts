import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {appLogger} from '../../../app-logger';


@Component({
  selector: 'app-mock-data-generator-form',
  templateUrl: './mock-data-form.component.html',
  styleUrls: ['./mock-data-form.component.scss']
})
export class MockDataFormComponent implements OnInit
{

  @Input() structure: FormControl;
  @Input() form: FormGroup;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() { }


  ngOnInit()
  {
    const builderArray = new FormArray([]);
    builderArray.valueChanges.subscribe(x => {
      appLogger().debug('value change on builder'
                        + (builderArray.valid ? ': ' : ' [invalid]: ')
                        + JSON.stringify(x));

      const newStructure = {};
      const builder = builderArray.value;
      for (const item of builder) { newStructure[item.name] = item.type; }

      appLogger().debug('new structure: ' + JSON.stringify(newStructure))
      this.structure.setValue(newStructure);
    });

    this.form.addControl('builder', builderArray);
  }
}
