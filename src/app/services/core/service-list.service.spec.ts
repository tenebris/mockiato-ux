import { TestBed } from '@angular/core/testing';

import { ServiceListService } from './service-list.service';

describe('ServiceListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceListService = TestBed.get(ServiceListService);
    expect(service).toBeTruthy();
  });
});
