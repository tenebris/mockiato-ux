import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {appLogger} from '../../app-logger';


export abstract class Authenticator
{
  public abstract login(): void;


  public abstract logout(): void;


  public abstract handleAuthentication(): void;


  public abstract isAuthenticated(): boolean;
}


/**
 * Dummy Implementation which should be replaced with a functional Authentication\authen
 * implementation in the {@link AppModule} using the following:
 *
 * {@code { provide: LoggingService, useClass: ConsoleAuthenticationService }}
 *
 */
@Injectable({providedIn: 'root'})
export class AuthenticationService extends Authenticator
{
  private _state: boolean;

  private readonly ACCESS_TOKEN_KEY: string = 'mockiato-ux.auth.state';


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~
  constructor(private router: Router)
  {
    super();
    this._state = Boolean(localStorage.getItem(this.ACCESS_TOKEN_KEY) || false);
    appLogger().critical(`
*****************************************************************************
  This Authentication Module will allow anyone to authenticate as any user.
  It is intended for development use when not connected to the network only.

  DON'T USE IT FOR PRODUCTION!
*****************************************************************************`);
  }


  login(): void
  {
    this._state = true;
    localStorage.setItem(this.ACCESS_TOKEN_KEY, String(true));
    appLogger().info('set auth-state to --> ' + this._state);
  }


  logout(): void
  {
    this._state = false;
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    appLogger().info('set auth-state to --> ' + this._state);
    this.router.navigate(['/']);
  }


  handleAuthentication(): void { }


  isAuthenticated(): boolean
  {
    return this._state = Boolean(localStorage.getItem(this.ACCESS_TOKEN_KEY) || false);
  }
}
