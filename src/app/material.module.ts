import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSlideToggleModule} from '@angular/material';


@NgModule({
  exports: [
    CdkTableModule,
    MatSlideToggleModule,
  ]
})
export class MaterialModule {}
