import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';


export abstract class Logger
{
  trace: any;
  debug: any;
  info: any;
  warn: any;
  error: any;
  critical: any;

  private readonly _logLevelHistory: LogLevel[] = [];

  protected level: LogLevel = environment.hasOwnProperty('logLevel') ? environment['logLevel'] : LogLevel.WARN;
  protected readonly noop = (): any => undefined;


  public shouldLogMessage(_input: LogLevel): boolean { return this.level <= _input; }


  // noinspection JSUnusedGlobalSymbols
  /**
   * Restores the last pushed value for the logging level in effect.
   */
  public popLogLevel(): void
  {
    if (this._logLevelHistory.length === 0)
    {
      this.warn('requested to pop log-level with no history '
                + '-- resetting to environment default', environment.logLevel);

      this.level = environment.logLevel;
      return;
    }

    this.level = this._logLevelHistory.unshift();
    this.debug('restored log level: ', this.level, this._logLevelHistory);
  }


  // noinspection JSUnusedGlobalSymbols
  /**
   * Pushed the current log-level on the stack and sets it to the specified level.
   *
   * This is intended to temporally override the log-level from the environment for debugging purposes.
   *
   * @param newLevel to use for log statements.
   */
  public pushLogLevel(newLevel: LogLevel): void
  {
    this.debug(`changing log level to ${newLevel} and pushing old value: ${this.level}`);
    this._logLevelHistory.push(this.level);
    this.level = newLevel;
  }

}


export enum LogLevel
{
  TRACE, DEBUG, INFO, WARN, ERROR, CRITICAL
}


/**
 * Dummy Implementation which should be replaced with a functional logger
 * implementation in the {@link AppModule} using the following:
 *
 * {@code { provide: LoggingService, useClass: ConsoleLoggerService }}
 *
 */
@Injectable({providedIn: 'root'})
export abstract class LoggingService extends Logger {}
