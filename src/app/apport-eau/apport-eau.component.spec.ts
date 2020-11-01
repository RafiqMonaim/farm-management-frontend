import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApportEauComponent } from './apport-eau.component';

describe('ApportEauComponent', () => {
  let component: ApportEauComponent;
  let fixture: ComponentFixture<ApportEauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApportEauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApportEauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
