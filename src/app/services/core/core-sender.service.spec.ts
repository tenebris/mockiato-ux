import { TestBed } from '@angular/core/testing';

import { CoreSenderService } from './core-sender.service';

describe('CoreSenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoreSenderService = TestBed.get(CoreSenderService);
    expect(service).toBeTruthy();
  });
});
