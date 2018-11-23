import {TestBed} from '@angular/core/testing';

import {LoggingService} from './logging.service';


describe('LoggingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggingService = TestBed.get(LoggingService);
    expect(service).toBeTruthy();

    service.trace('trace test');
    service.debug('debug test');
    service.info('info test');
    service.warn('warn test');
    service.error('error test');
    service.critical('critical test');
  });
});
