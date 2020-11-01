import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterStationComponent } from './water-station.component';

describe('WaterStationComponent', () => {
  let component: WaterStationComponent;
  let fixture: ComponentFixture<WaterStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
