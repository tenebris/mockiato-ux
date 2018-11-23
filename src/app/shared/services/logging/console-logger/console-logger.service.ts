import {Injectable} from '@angular/core';
import {Logger, LogLevel} from '../logging.service';




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
           : this.noop;
  }

  // noinspection JSUnusedGlobalSymbols -- WebStorm doesn't recognize this override
  get debug(): any
  {
    // noinspection TsLint
    return this.shouldLogMessage(LogLevel.DEBUG)
           ? console.debug.bind(console, LogLevel[LogLevel.DEBUG] + ':')
           : this.noop;
  }


  // noinspection JSUnusedGlobalSymbols -- WebStorm doesn't recognize this override
  get info(): any
  {
    // noinspection TsLint
    return this.shouldLogMessage(LogLevel.INFO)
           ? console.info.bind(console, LogLevel[LogLevel.INFO] + ':')
           : this.noop;
  }


  // noinspection JSUnusedGlobalSymbols -- WebStorm doesn't recognize this override
  get warn(): any
  {
    // noinspection TsLint
    return this.shouldLogMessage(LogLevel.WARN)
           ? console.warn.bind(console, LogLevel[LogLevel.WARN] + ':')
           : this.noop;
  }


  // noinspection JSUnusedGlobalSymbols -- WebStorm doesn't recognize this override
  get error(): any
  {
    // noinspection TsLint
    return this.shouldLogMessage(LogLevel.ERROR)
           ? console.error.bind(console, LogLevel[LogLevel.ERROR] + ':')
           : this.noop;
  }


  // noinspection JSUnusedGlobalSymbols -- WebStorm doesn't recognize this override
  get critical(): any
  {
    // noinspection TsLint
    return this.shouldLogMessage(LogLevel.CRITICAL)
           ? console.error.bind(console, LogLevel[LogLevel.CRITICAL] + ':')
           : this.noop;
  }

}
