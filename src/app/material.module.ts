import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {MatInputModule, MatSlideToggleModule, MatSortModule, MatTableModule} from '@angular/material';


@NgModule({
  exports: [
    CdkTableModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    MatInputModule
  ]
})
export class MaterialModule {}
