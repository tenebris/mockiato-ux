import {LoggingService} from './services/logging/logging.service';

let appLoggerRef: LoggingService;
export const appLogger = (logger?: LoggingService): LoggingService => {
  if (logger) {appLoggerRef = logger;}

  return appLoggerRef;
};
