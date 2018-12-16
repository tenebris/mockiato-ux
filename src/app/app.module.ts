import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {Injector, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';

// TODO: move these, along with 'library' call in ctor into our CoreModule
import {FaIconService, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library as FaLibrary} from '@fortawesome/fontawesome-svg-core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {faEdit, faEye, faPlayCircle, faQuestionCircle, faStopCircle, faTrashAlt} from '@fortawesome/free-regular-svg-icons';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AgGridModule} from 'ag-grid-angular';

import {ShowIfAuthenticatedDirective} from './shared/directives/show-if-authenticated/show-if-authenticated.directive';

import {PrototypeUxComponent} from './views/home/prototype-ux/prototype-ux.component';
import {PageNotFoundComponent} from './views/misc/page-not-found/page-not-found.component';
import {SimpleHeaderComponent} from './shared/components/simple-header/simple-header.component';
import {SimpleFooterComponent} from './shared/components/simple-footer/simple-footer.component';
import {LoginModalComponent} from './views/auth/login-modal/login-modal.component';
import {SimpleModalComponent} from './shared/components/simple-modal/simple-modal.component';
import {RRPairListComponent} from './shared/components/rrpair-list/rrpair-list.component';
import {RRPairComponent} from './shared/components/rrpair/rrpair.component';

import {ServiceListComponent} from './shared/components/service-list/service-list.component';

import {CallbackComponent} from './views/auth/auth0/callback/callback.component';
import {LogoutComponent} from './views/auth/auth0/logout/logout.component';

import {CommingSoonComponent} from './views/misc/comming-soon/comming-soon.component';
import {IntentionallyBlankComponent} from './shared/components/intentionally-blank/intentionally-blank.component';

import {BrowseSystemV1Component} from './views/v1/browse-system/browse-system-v1.component';
import {ServiceDetailV1Component} from './views/v1/service-detail/service-detail-v1.component';
import {MockDataGenerationV1Component} from './views/v1/mock-data-generation/mock-data-generation-v1.component';

import {appInjector} from './shared/app-injector';
import {appLogger} from './shared/app-logger';

import {LoggingService} from './shared/services/logging/logging.service';
import {ConsoleLoggerService} from './shared/services/logging/console-logger/console-logger.service';

import {CoreModule} from './shared/core.module';
import {MockDataModule} from './shared/services/mock-data-generator/mock-data.module';
import {AuthenticationModule} from './shared/services/auth/authentication.module';


@NgModule({
  declarations: [
    AppComponent,

    // Top-Level Views
    PageNotFoundComponent,
    PrototypeUxComponent,

    // Page-Level Views
    BrowseSystemV1Component,
    ServiceDetailV1Component,
    MockDataGenerationV1Component,

    // Directives
    ShowIfAuthenticatedDirective,

    // Auth0 Related Components
    // TODO: move these to an AuthenticationModule
    LogoutComponent,
    CallbackComponent,

    // Shared Components
    SimpleHeaderComponent,
    SimpleFooterComponent,
    CommingSoonComponent,
    IntentionallyBlankComponent,
    ServiceListComponent,
    RRPairListComponent,
    RRPairComponent,
    LoginModalComponent,
    SimpleModalComponent,
  ],
  imports:
    [
      CoreModule,
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule, // import after BrowserModule
      AgGridModule.withComponents([]),
      MockDataModule,
      AuthenticationModule,
      AppRoutingModule,
      FontAwesomeModule
    ],
  providers:
    [
      DatePipe,
      {provide: LoggingService, useClass: ConsoleLoggerService},
    ],
  bootstrap: [AppComponent]
})
export class AppModule
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(injector: Injector, logger: LoggingService, faIconService: FaIconService)
  {
    // save these for simple global access
    appInjector(injector);
    appLogger(logger);

    faIconService.defaultPrefix = 'far';

    FaLibrary.add(faCoffee);
    FaLibrary.add(faEye);
    FaLibrary.add(faEdit);
    FaLibrary.add(faTrashAlt);
    FaLibrary.add(faStopCircle);
    FaLibrary.add(faPlayCircle);
    FaLibrary.add(faQuestionCircle);

  }
}
