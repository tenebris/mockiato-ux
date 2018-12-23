import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MockDataGeneratorService} from '../../../mock-data-generator.service';


@Component({
  selector: 'app-mock-element',
  templateUrl: './mock-element-dynamic-form.component.html',
  styleUrls: ['./mock-element-dynamic-form.component.scss']
})
export class MockElementDynamicFormComponent
{
  @Input() element: FormControl;

  private _supportedTypes: { type: string; displayValue?: string }[];


  // ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(generator: MockDataGeneratorService)
  { this._supportedTypes = generator.supportedDataTypes; }
}
