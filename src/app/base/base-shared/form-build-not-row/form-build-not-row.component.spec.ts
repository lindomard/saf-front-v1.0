import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuildNotRowComponent } from './form-build-not-row.component';

describe('FormBuildNotRowComponent', () => {
  let component: FormBuildNotRowComponent;
  let fixture: ComponentFixture<FormBuildNotRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBuildNotRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuildNotRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
