import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {MatInputModule, MatPaginatorModule, MatSlideToggleModule, MatSortModule, MatTableModule} from '@angular/material';


@NgModule({
  exports: [
    CdkTableModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule
  ]
})
export class MaterialModule {}
