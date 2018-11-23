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


  protected readonly level: LogLevel = environment.hasOwnProperty('logLevel') ? environment['logLevel'] : LogLevel.TRACE;

  protected readonly noop = (): any => undefined;

  protected shouldLogMessage(_input: LogLevel): boolean { return this.level <= _input; }
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
