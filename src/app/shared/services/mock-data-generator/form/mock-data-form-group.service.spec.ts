import { TestBed } from '@angular/core/testing';

import { MockDataFormGroupService } from './mock-data-form-group.service';

describe('MockDataFormGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockDataFormGroupService = TestBed.get(MockDataFormGroupService);
    expect(service).toBeTruthy();
  });
});
