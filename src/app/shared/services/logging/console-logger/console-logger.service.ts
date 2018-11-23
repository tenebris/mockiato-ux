import {Injectable} from '@angular/core';
import {Logger, LogLevel} from '../logging.service';


const noop = (): any => undefined;


/** Provides a simile logger which outputs to the console. */
@Injectable({providedIn: 'root'})
export class ConsoleLoggerService extends Logger
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor()
  {
    super();
    console.log('Initialized ConsoleLoggerService with level ' + LogLevel[this.level]);
  }


  // noinspection JSUnusedGlobalSymbols -- WebStorm doesn't recognize this override
  get trace(): any
  {
    // noinspection TsLint
    return this.shouldLogMessage(LogLevel.TRACE)
           ? console.debug.bind(console, LogLevel[LogLevel.TRACE] + ':')
           : noop;
  }

  // noinspection JSUnusedGlobalSymbols -- WebStorm doesn't recognize this override
  get debug(): any
  {
    // noinspection TsLint
    return this.shouldLogMessage(LogLevel.DEBUG)
           ? console.debug.bind(console, LogLevel[LogLevel.DEBUG] + ':')
           : noop;
  }


  // noinspection JSUnusedGlobalSymbols -- WebStorm doesn't recognize this override
  get info(): any
  {
    // noinspection TsLint
    return this.shouldLogMessage(LogLevel.INFO)
           ? console.info.bind(console, LogLevel[LogLevel.INFO] + ':')
           : noop;
  }


  // noinspection JSUnusedGlobalSymbols -- WebStorm doesn't recognize this override
  get warn(): any
  {
    // noinspection TsLint
    return this.shouldLogMessage(LogLevel.WARN)
           ? console.warn.bind(console, LogLevel[LogLevel.WARN] + ':')
           : noop;
  }


  // noinspection JSUnusedGlobalSymbols -- WebStorm doesn't recognize this override
  get error(): any
  {
    // noinspection TsLint
    return this.shouldLogMessage(LogLevel.ERROR)
           ? console.error.bind(console, LogLevel[LogLevel.ERROR] + ':')
           : noop;
  }


  // noinspection JSUnusedGlobalSymbols -- WebStorm doesn't recognize this override
  get critical(): any
  {
    // noinspection TsLint
    return this.shouldLogMessage(LogLevel.CRITICAL)
           ? console.error.bind(console, LogLevel[LogLevel.CRITICAL] + ':')
           : noop;
  }

}
