interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'VL0mykQ9D2x2qmVuAcsitlq8NQp2tshE',
  domain: 'tenebris.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
