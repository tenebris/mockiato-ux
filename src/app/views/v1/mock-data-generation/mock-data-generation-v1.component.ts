import {Component, OnInit} from '@angular/core';
import {MockDataGeneratorService} from '../../../shared/services/mock-data-generator/mock-data-generator.service';
import {MockDataFormGroupService} from '../../../shared/services/mock-data-generator/form/v1/mock-data-form-group.service';
import {FormControl, FormGroup} from '@angular/forms';
import {appLogger} from '../../../shared/app-logger';
import {downloadMockData} from '../../../shared/services/mock-data-generator/form/mock-data-form-utilities.module';


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
  readonly _supportedFileTypes = ['json', 'csv'];
  submitted = false;
  results: object[] = undefined;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private generator: MockDataGeneratorService, private formGroupGenerator: MockDataFormGroupService)
  {
    this._root = new FormGroup({
      fileName: new FormControl('mock-data'),
      fileType: new FormControl('json'),
      itemCount: new FormControl(10),
      downloadIndicator: new FormControl(false),
      structure: this.structure,
    });

    this._resetForm = new FormGroup({});
  }


  onSubmit()
  {
    this.submitted = true;

    let options = this._root.value;
    const itemCount = options.itemCount;

    const structure = this.structure.value;
    const dataStructure = this.generator.buildStructure(structure);
    this.results = this.generator.generate(dataStructure, itemCount);

    if (options.downloadIndicator)
    {
      downloadMockData({
        data: this.results,
        structure: structure,
        fileType: options.fileType,
        fileName: options.fileName,
      });
    }
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
