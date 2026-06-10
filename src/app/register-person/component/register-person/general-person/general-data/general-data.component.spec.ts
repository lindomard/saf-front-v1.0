import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GeneralDataComponent } from './general-data.component';

describe('GeneralDataComponent', () => {
  let component: GeneralDataComponent;
  let fixture: ComponentFixture<GeneralDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
