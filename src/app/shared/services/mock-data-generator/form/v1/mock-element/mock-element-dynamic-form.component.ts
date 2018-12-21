import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-mock-element',
  templateUrl: './mock-element-dynamic-form.component.html',
  styleUrls: ['./mock-element-dynamic-form.component.scss']
})
export class MockElementDynamicFormComponent
{
  @Input() element: FormControl;

  // TODO: replace with references to service/enum
  _supportedTypes = ['name', 'address', 'state', 'zip'];

  get isValid() { return this.element.valid; }
}
