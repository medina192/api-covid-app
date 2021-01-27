import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryStatisticsComponent } from './secondary-statistics.component';

describe('SecondaryStatisticsComponent', () => {
  let component: SecondaryStatisticsComponent;
  let fixture: ComponentFixture<SecondaryStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
