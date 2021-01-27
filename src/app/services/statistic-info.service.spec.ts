import { TestBed } from '@angular/core/testing';

import { StatisticInfoService } from './statistic-info.service';

describe('StatisticInfoService', () => {
  let service: StatisticInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
