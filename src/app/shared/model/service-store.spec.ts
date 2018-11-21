import { TestBed } from '@angular/core/testing';

import { ServiceStore } from './service-store';

describe('ServiceStore', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceStore = TestBed.get(ServiceStore);
    expect(service).toBeTruthy();
  });
});
