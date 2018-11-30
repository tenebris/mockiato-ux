import { TestBed } from '@angular/core/testing';

import { MockDataGeneratorService } from './mock-data-generator.service';

describe('MockDataGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockDataGeneratorService = TestBed.get(MockDataGeneratorService);
    expect(service).toBeTruthy();
  });
});
