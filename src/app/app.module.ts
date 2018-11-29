import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AgGridModule} from 'ag-grid-angular';

import {ShowIfAuthenticatedDirective} from './shared/directives/show-if-authenticated/show-if-authenticated.directive';

import {PrototypeUxComponent} from './views/home/prototype-ux/prototype-ux.component';
import {PageNotFoundComponent} from './views/misc/page-not-found/page-not-found.component';
import {SimpleHeaderComponent} from './shared/components/simple-header/simple-header.component';
import {SimpleFooterComponent} from './shared/components/simple-footer/simple-footer.component';

import {CallbackComponent} from './views/auth/auth0/callback/callback.component';
import {LogoutComponent} from './views/auth/auth0/logout/logout.component';

import {CommingSoonComponent} from './views/misc/comming-soon/comming-soon.component';
import {ServiceListComponent} from './shared/components/service-list/service-list.component';

import {BrowseSystemV1Component} from './views/v1/browse-system/browse-system-v1.component';
import {ServiceDetailV1Component} from './views/v1/service-detail/service-detail-v1.component';

import {appInjector} from './shared/app-injector';
import {appLogger} from './shared/app-logger';

import {LoggingService} from './shared/services/logging/logging.service';
import {ConsoleLoggerService} from './shared/services/logging/console-logger/console-logger.service';
import {AuthenticationService} from './shared/services/auth/authentication-service';
import {Auth0AuthenticationService} from './shared/services/auth/auth0/auth0-authentication.service';
import {LoginModalComponent} from './views/auth/login-modal/login-modal.component';
import {SimpleModalComponent} from './shared/components/simple-modal/simple-modal.component';


@NgModule({
  declarations: [
    AppComponent,

    // Top-Level Views
    PageNotFoundComponent,
    PrototypeUxComponent,

    // Page-Level Views
    BrowseSystemV1Component,
    ServiceDetailV1Component,
    SimpleFooterComponent,

    // Directives
    ShowIfAuthenticatedDirective,

    // Auth0 Related Components
    // TODO: move these to an AuthenticationModule
    LogoutComponent,
    CallbackComponent,

    // Shared Components
    SimpleHeaderComponent,
    CommingSoonComponent,
    ServiceListComponent,
    LoginModalComponent,
    SimpleModalComponent,
  ],
  imports:
    [
      BrowserModule,
      HttpClientModule, // import after BrowserModule
      AgGridModule.withComponents([]),
      AppRoutingModule
    ],
  providers:
    [
      {provide: LoggingService, useClass: ConsoleLoggerService},
      {provide: AuthenticationService, useClass: Auth0AuthenticationService}, // TODO: make dynamic via environment in AuthenticationModule
    ],
  bootstrap: [AppComponent]
})
export class AppModule
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(injector: Injector, logger: LoggingService)
  {
    // save these for simple global access
    appInjector(injector);
    appLogger(logger);
  }
}
