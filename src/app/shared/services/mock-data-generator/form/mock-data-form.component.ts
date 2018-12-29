import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';


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
    this.form.addControl('builder', new FormArray([]));
  }
}
