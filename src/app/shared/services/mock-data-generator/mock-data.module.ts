import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreModule} from '../../core.module';

import {MockDataGeneratorService} from './mock-data-generator.service';
import {MockElementDynamicFormComponent} from './form/mock-element/mock-element-dynamic-form.component';
import {ChanceMockDataGeneratorService} from './generators/chance/mock-data-generator.service';
import {MockDataStructureComponent} from './form/mock-data-structure/mock-data-structure.component';


@NgModule({
  declarations: [
    MockElementDynamicFormComponent,
    MockDataStructureComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    MockElementDynamicFormComponent,
    MockDataStructureComponent
  ],
  providers: [
    {provide: MockDataGeneratorService, useClass: ChanceMockDataGeneratorService},
  ]
})
export class MockDataModule {}
