interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

// noinspection JSUnusedGlobalSymbols
export const AUTH_CONFIG: AuthConfig = {
  // NOTE: these values must be changed for any forked instances.
  // these values are only appropriate for use by Tenebris Development Studio.
  clientID: 'VL0mykQ9D2x2qmVuAcsitlq8NQp2tshE',
  domain: 'tenebris.auth0.com',
  callbackURL: 'https://tenebris-mockiato-ux.ngrok.io/callback'
};
