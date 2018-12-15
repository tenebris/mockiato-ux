import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MockDataGeneratorService} from './mock-data-generator.service';
import {MockElementDynamicFormComponent} from './form/mock-element/mock-element-dynamic-form.component';
import {ChanceMockDataGeneratorService} from './generators/chance/mock-data-generator.service';


@NgModule({
  declarations: [
    MockElementDynamicFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MockElementDynamicFormComponent,
  ],
  providers: [
    {provide: MockDataGeneratorService, useClass: ChanceMockDataGeneratorService},
  ]
})
export class MockDataModule {}
