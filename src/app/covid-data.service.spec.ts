import { TestBed } from '@angular/core/testing';

import { CovidDataService } from './covid-data.service';

describe('CovidDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CovidDataService = TestBed.get(CovidDataService);
    expect(service).toBeTruthy();
  });
});
