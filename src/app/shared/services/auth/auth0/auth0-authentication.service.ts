import {Injectable} from '@angular/core';
import {AUTH_CONFIG} from './auth0-variables';
import {Router} from '@angular/router';
import * as auth0 from 'auth0-js';
import {Authenticator} from '../authentication-service';


(window as any).global = window;

const ACCESS_TOKEN_KEY: string = 'mockiato-ux.auth0.access_token';
const ID_TOKEN_KEY: string = 'mockiato-ux.auth0.id_token';
const EXPIRES_AT_KEY: string = 'mockiato-ux.auth0.expires_at';


@Injectable({providedIn: 'root'})
export class Auth0AuthenticationService extends Authenticator
{

  readonly auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.callbackURL
  });

  readonly name: string;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(public router: Router) { super(); }


  public login(): void { this.auth0.authorize(); }


  public logout(): void
  {
    // Remove tokens and expiry time from localStorage

    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ID_TOKEN_KEY);
    localStorage.removeItem(EXPIRES_AT_KEY);
    // Go back to the home route
    this.router.navigate(['/']);
  }


  public handleAuthentication(): void
  {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken)
      {

        this.setSession(authResult);
        this.router.navigate(['/']);

      } else if (err)
      {

        this.router.navigate(['/']);
        // FIXME (otter): thids seems to break things?
        // appLogger().debug(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }


  public isAuthenticated(): boolean
  {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem(EXPIRES_AT_KEY) || '{}');
    return new Date().getTime() < expiresAt;
  }


  private setSession(authResult): void
  {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem(ACCESS_TOKEN_KEY, authResult.accessToken);
    localStorage.setItem(ID_TOKEN_KEY, authResult.idToken);
    localStorage.setItem(EXPIRES_AT_KEY, expiresAt);
  }

}
