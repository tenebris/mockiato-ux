import {Injector, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';

import {appInjector} from './app-injector';
import {appLogger} from './app-logger';

import {LoggingService} from './services/logging/logging.service';

import {DebugBlockComponent} from './components/debug-block/debug-block.component';
import {SimpleModalComponent} from './components/simple-modal/simple-modal.component';
import {ServiceListV2Component} from './components/v2/service-list/service-list-v2.component';


// TODO: Placeholder for all of this app's core services.
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [DebugBlockComponent, SimpleModalComponent, ServiceListV2Component],
  exports: [DebugBlockComponent, SimpleModalComponent, ServiceListV2Component],
  providers: [],
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
