export interface EnvironmentConfiguration
{
  readonly production: boolean;   // true or false -- used to send Angular into Production mode.
  readonly logLevel: number;      // uses number to avoid circular dependency... see LogLevel in shared/services/logging/logging.service
  readonly coreBaseUrl: string;   // base-url of the Mockiato-Core instance that the ux references for data
  internalAuthModal?: boolean;    // optional -- set to true if the authentication
}
