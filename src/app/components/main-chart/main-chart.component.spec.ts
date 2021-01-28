import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainChartComponent } from './main-chart.component';

describe('MainChartComponent', () => {
  let component: MainChartComponent;
  let fixture: ComponentFixture<MainChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
