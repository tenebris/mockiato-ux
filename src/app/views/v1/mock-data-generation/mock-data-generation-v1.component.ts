import {Component, OnInit} from '@angular/core';
import {MockDataGeneratorService} from '../../../shared/services/mock-data-generator/mock-data-generator.service';
import {MockDataFormGroupService} from '../../../shared/services/mock-data-generator/form/mock-data-form-group.service';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-view-mock-data-generation',
  templateUrl: './mock-data-generation-v1.component.html',
  styleUrls: ['./mock-data-generation-v1.component.scss']
})
export class MockDataGenerationV1Component implements OnInit
{

  _root: FormGroup;
  _resetForm: FormGroup;

  submitted = false;
  results = undefined;

  readonly _supportedFileTypes = ['json', 'xml'];


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private generator: MockDataGeneratorService, private formGroupGenerator: MockDataFormGroupService)
  {
    // nothing need here...
  }


  onSubmit()
  {
    this.submitted = true;

    const value = this._root.value;
    this.results = this.generator.generate({itemCount: value.itemCount});
  }


  ngOnInit()
  {
    this._root = new FormGroup({
      fileName: new FormControl('mock-data'),
      fileType: new FormControl('json'),
      itemCount: new FormControl(10),
    });

    this._resetForm = new FormGroup({});
  }


  onRestResults()
  {
    this.results = undefined;
    this.submitted = false;
  }
}
