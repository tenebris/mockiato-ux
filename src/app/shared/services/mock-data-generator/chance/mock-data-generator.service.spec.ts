import {TestBed} from '@angular/core/testing';

import {ChanceMockDataGeneratorService} from './mock-data-generator.service';


describe('MockDataGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChanceMockDataGeneratorService = TestBed.get(ChanceMockDataGeneratorService);
    expect(service).toBeTruthy();
  });
});
