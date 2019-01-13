import {Component, OnInit} from '@angular/core';
import {MockDataGeneratorService} from '../../../shared/services/mock-data-generator/mock-data-generator.service';
import {MockDataFormGroupService} from '../../../shared/services/mock-data-generator/form/v1/mock-data-form-group.service';
import {FormControl, FormGroup} from '@angular/forms';
import {appLogger} from '../../../shared/app-logger';
import {of} from 'rxjs';


function structureToHeaderRow(structure: object): string
{
  const cols: string[] = [];
  for (const key of Object.keys(structure)) cols.push(`"${key}"`);
  return cols.join(',');
}


function structureToRow(row: object): string
{
  const cols: string[] = [];
  for (const key of Object.keys(row)) cols.push(`"${row[key]}"`);
  return cols.join(',');
}


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
  results = undefined;
  private _downloadElement = null as HTMLElement;


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

    const itemCount = this._root.value.itemCount;
    const value = this.structure.value;
    const structure = this.generator.buildStructure(value);

    this.results = this.generator.generate(structure, itemCount);

    if (this._root.value.downloadIndicator)
    {
      of(this.results).subscribe((res) => {
        this.dynamicDownloadByHtmlTag(res);
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


  private dynamicDownloadByHtmlTag(data: object)
  {
    // create an element if not already done...
    if (!this._downloadElement) this._downloadElement = document.createElement('a');

    const value = this._root.value;

    // these are set based on the file-type requested
    let fileType;
    let suffix;
    let text;

    switch (value.fileType)
    {
      case 'csv':
        const csv: string[] = [];
        csv.push(structureToHeaderRow(this.structure.value));
        csv.push(this.results.map(structureToRow));

        fileType = 'text/csv';
        suffix = '.csv';
        text = csv.join('\n');
        break;

      case 'json':
        fileType = 'text/json';
        suffix = '.json';
        text = JSON.stringify(value);
        break;

      default:
        throw new Error(`unknown fileType: ${value.fileType}`);
    }

    const fileName = value.fileName + suffix;
    const element = this._downloadElement;
    const event = new MouseEvent('click');

    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute('download', fileName);

    element.dispatchEvent(event);
  }


  ngOnInit() {}
}
