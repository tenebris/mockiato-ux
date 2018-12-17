import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreModule} from '../../core.module';

import {MockDataGeneratorService} from './mock-data-generator.service';
import {MockElementDynamicFormComponent} from './form/mock-element/mock-element-dynamic-form.component';
import {ChanceMockDataGeneratorService} from './generators/chance/mock-data-generator.service';
import {MockDataStructureComponent} from './form/mock-data-structure/mock-data-structure.component';
import {LoadSavedStructureComponent} from './form/load-saved-structure/load-saved-structure.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    MockElementDynamicFormComponent,
    MockDataStructureComponent,
    LoadSavedStructureComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  exports: [
    MockElementDynamicFormComponent,
    MockDataStructureComponent,
    LoadSavedStructureComponent,
  ],
  providers: [
    {provide: MockDataGeneratorService, useClass: ChanceMockDataGeneratorService},
  ]
})
export class MockDataModule {}
