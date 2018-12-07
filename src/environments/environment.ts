// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {EnvironmentConfiguration} from '../app/shared/model/common/environment-configuration';


export const environment: EnvironmentConfiguration = {
  production: false,                              // guess... :)
  logLevel: 0,                                    // see LogLevel in src/app/shared/services/logging/logging.service.ts
  coreBaseUrl: 'https://tenebris-mockiato.ngrok.io',           // base-url to use when referencing the core
  internalAuthModal: false,                       // enable if using internal authentication modal
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
