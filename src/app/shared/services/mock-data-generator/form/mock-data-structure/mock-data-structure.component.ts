import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {appLogger} from '../../../../app-logger';


@Component({
  selector: 'app-mock-data-structure',
  templateUrl: './mock-data-structure.component.html',
  styleUrls: ['./mock-data-structure.component.scss']
})
export class MockDataStructureComponent implements OnInit
{

  @Input() path: string[];
  @Input() structure: any;
  @Input() form: FormGroup;


  private key: string;


  doAddElement(): void
  {
    this.structure[this.key] = {};
    appLogger().debug('addingElement: '); // TODO: add name/type to log message...
  }


  ngOnInit()
  {
    if (!this.path) this.path = ['root'];
    this.key = this.path.join('.');
    appLogger().debug('initializing mock-structure: ' + this.path);

  }

}
