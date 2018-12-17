import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {appLogger} from '../../../../app-logger';


@Component({
  selector: 'app-mock-data-structure',
  templateUrl: './mock-data-structure.component.html',
  styleUrls: ['./mock-data-structure.component.scss']
})
export class MockDataStructureComponent implements OnInit
{

  @Input() form: FormGroup;
  @Input() structure: FormControl;


  // ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() {}


  doAddRootElement(): void
  {
    this.structure.value['testing'] = 'address';
    appLogger().debug('addingElement: '); // TODO: add name/type to log message...
  }


  ngOnInit() {}

}
