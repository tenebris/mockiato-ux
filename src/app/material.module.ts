import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSlideToggleModule, MatSortModule, MatTableModule} from '@angular/material';


@NgModule({
  exports: [
    CdkTableModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule
  ]
})
export class MaterialModule {}
