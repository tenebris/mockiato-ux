import {EnvironmentConfiguration} from '../app/shared/model/common/environment-configuration';


// noinspection JSUnusedGlobalSymbols
export const environment: EnvironmentConfiguration = {
  production: true,
  logLevel: 3,  // see LogLevel in src/app/shared/services/logging/logging.service.ts
  coreBaseUrl: 'https://tenebris-mockiato.ngrok.io',
};
