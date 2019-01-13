import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MockDataGeneratorService} from '../../../mock-data-generator.service';
import {appLogger} from '../../../../../app-logger';


@Component({
  selector: 'app-mock-element',
  templateUrl: './mock-element-dynamic-form.component.html',
  styleUrls: ['./mock-element-dynamic-form.component.scss']
})
export class MockElementDynamicFormComponent
{
  @Input() element: FormControl;
  @Output() elementRemoved = new EventEmitter<object>();

  _supportedTypes: { type: string; displayValue?: string }[];


  // ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(generator: MockDataGeneratorService)
  { this._supportedTypes = generator.supportedDataTypes; }


  notifyDeath()
  {
    appLogger().debug('element killed', this.element.value);
    this.elementRemoved.emit(this.element.value);
  }
}
