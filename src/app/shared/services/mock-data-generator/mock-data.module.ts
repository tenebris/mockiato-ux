import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {CoreModule} from '../../core.module';

import {MockDataGeneratorService} from './mock-data-generator.service';
import {MockElementDynamicFormComponent} from './form/v1/mock-element/mock-element-dynamic-form.component';
import {ChanceMockDataGeneratorService} from './generators/chance/mock-data-generator.service';
import {MockDataStructureComponent} from './form/v1/mock-data-structure/mock-data-structure.component';
import {LoadSavedStructureComponent} from './form/v1/load-saved-structure/load-saved-structure.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MockDataFormComponent} from './form/mock-data-form.component';
import {MockGroupV1Component} from './form/v1/mock-group/mock-group-v1.component';
import {MaterialModule} from '../../../material.module';


@NgModule({
  declarations: [
    MockElementDynamicFormComponent,
    MockDataStructureComponent,
    LoadSavedStructureComponent,
    MockDataFormComponent,
    MockGroupV1Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    DragDropModule,
    MaterialModule
  ],
  exports: [
    LoadSavedStructureComponent,
    MockDataFormComponent,
  ],
  providers: [
    {provide: MockDataGeneratorService, useClass: ChanceMockDataGeneratorService},
  ]
})
export class MockDataModule {}
