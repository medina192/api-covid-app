import { TestBed } from '@angular/core/testing';

import { SearchCountryService } from './search-country.service';

describe('SearchCountryService', () => {
  let service: SearchCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
