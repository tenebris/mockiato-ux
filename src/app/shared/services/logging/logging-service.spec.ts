import { TestBed } from '@angular/core/testing';

import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  // beforeEach(() => TestBed.configureTestingModule({}));
  //
  // it('should be created', () => {
  //   const service: LoggingService = TestBed.get(LoggingService);
  //   expect(service).toBeTruthy();
  // });

  let service: LoggingService;

  beforeEach(() => {
    service = new LoggingService();
  });

  it('log at various levels', () => {
    const msgText = 'fubar';
    service.debug();
  });
});
