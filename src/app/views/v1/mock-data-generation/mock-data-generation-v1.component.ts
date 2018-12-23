import {Component, OnInit} from '@angular/core';
import {MockDataGeneratorService} from '../../../shared/services/mock-data-generator/mock-data-generator.service';
import {MockDataFormGroupService} from '../../../shared/services/mock-data-generator/form/v1/mock-data-form-group.service';
import {FormControl, FormGroup} from '@angular/forms';
import {SavedStructure} from '../../../shared/services/mock-data-generator/form/v1/load-saved-structure/load-saved-structure.component';
import {MockDataStructure} from '../../../shared/services/mock-data-generator/mock-data-structure';


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

    const itemCount = this._root.value.itemCount;
    const value = this._root.get('structure').value;
    const structure = this.generator.buildStructure(value);

    this.results = this.generator.generate(structure, itemCount);
  }


  onResetResults()
  {
    this.results = undefined;
    this.submitted = false;
  }


  ngOnInit()
  {
    this._root = new FormGroup({
      fileName: new FormControl('mock-data'),
      fileType: new FormControl('json'),
      itemCount: new FormControl(10),
      structure: new FormControl(undefined),
    })
    ;

    this._resetForm = new FormGroup({});
  }
}
