import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {MockElementBase} from './mock-element-base';


@Component({
  selector: 'app-mock-element',
  templateUrl: './mock-element-dynamic-form.component.html',
  styleUrls: ['./mock-element-dynamic-form.component.scss']
})
export class MockElementDynamicFormComponent
{
  @Input() element: MockElementBase<any>;
  @Input() form: FormGroup;


  get isValid() { return this.form.controls[this.element.key].valid; }
}
