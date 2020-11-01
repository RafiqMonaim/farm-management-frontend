import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelleComponent } from './parcelle.component';

describe('ParcelleComponent', () => {
  let component: ParcelleComponent;
  let fixture: ComponentFixture<ParcelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
