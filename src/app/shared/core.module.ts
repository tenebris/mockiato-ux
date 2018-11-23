import {Injector, NgModule, Optional, SkipSelf} from '@angular/core';

import {CommonModule} from '@angular/common';
import {LoggingService} from './services/logging/logging.service';

import {appInjector} from './app-injector';
import {appLogger} from './app-logger';


// TODO: Placeholder for all of this app's core services.
@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: []
})
export class CoreModule
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, injector: Injector, logger: LoggingService)
  {
    if (parentModule)
    { throw new Error('CoreModule is already loaded. Import it in the AppModule only'); }

    appInjector(injector);    // save injector off for use in other parts of the application...
    appLogger(logger);    // save injector off for use in other parts of the application...

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
