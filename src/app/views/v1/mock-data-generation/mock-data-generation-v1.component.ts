import {Component, OnInit} from '@angular/core';
import {MockDataGeneratorService} from '../../../shared/services/mock-data-generator/mock-data-generator.service';
import {MockDataFormGroupService} from '../../../shared/services/mock-data-generator/form/v1/mock-data-form-group.service';
import {FormControl, FormGroup} from '@angular/forms';
import {appLogger} from '../../../shared/app-logger';


@Component({
  selector: 'app-view-mock-data-generation',
  templateUrl: './mock-data-generation-v1.component.html',
  styleUrls: ['./mock-data-generation-v1.component.scss']
})
export class MockDataGenerationV1Component implements OnInit
{

  readonly _root: FormGroup;
  readonly _resetForm: FormGroup;
  readonly structure = new FormControl(undefined);


  submitted = false;
  results = undefined;

  readonly _supportedFileTypes = ['json', 'xml'];


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private generator: MockDataGeneratorService, private formGroupGenerator: MockDataFormGroupService)
  {
    this._root = new FormGroup({
      fileName: new FormControl('mock-data'),
      fileType: new FormControl('json'),
      itemCount: new FormControl(10),
      structure: this.structure,
    });

    this._resetForm = new FormGroup({});
  }


  onSubmit()
  {
    this.submitted = true;

    const itemCount = this._root.value.itemCount;
    const value = this.structure.value;
    const structure = this.generator.buildStructure(value);

    this.results = this.generator.generate(structure, itemCount);
  }


  onResetResults()
  {
    this.results = undefined;
    this.submitted = false;
  }


  processLoadEvent(event: object)
  {
    appLogger().trace('detected load event', event);
    this.structure.setValue(event);
  }


  ngOnInit() {}
}
