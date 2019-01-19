import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSlideToggleModule, MatTableModule} from '@angular/material';


@NgModule({
  exports: [
    CdkTableModule,
    MatSlideToggleModule,
    MatTableModule
  ]
})
export class MaterialModule {}
