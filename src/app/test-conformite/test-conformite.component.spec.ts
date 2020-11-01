import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestConformiteComponent } from './test-conformite.component';

describe('TestConformiteComponent', () => {
  let component: TestConformiteComponent;
  let fixture: ComponentFixture<TestConformiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestConformiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestConformiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
