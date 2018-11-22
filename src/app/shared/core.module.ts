import {NgModule, Optional, SkipSelf} from '@angular/core';

import {CommonModule} from '@angular/common';

// TODO: Placeholder for all of this app's core services.
@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) { throw new Error('CoreModule is already loaded. Import it in the AppModule only'); }
  }

  // TODO: provide for plugable authentication modules.
  // static forRoot(config: UserServiceConfig): ModuleWithProviders {
  //   return {
  //     ngModule: CoreModule,
  //     providers: [
  //       {provide: UserServiceConfig, useValue: config }
  //     ]
  //   };
  // }
}
