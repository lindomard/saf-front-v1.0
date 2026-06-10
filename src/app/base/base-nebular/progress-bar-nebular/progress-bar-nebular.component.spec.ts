import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarNebularComponent } from './progress-bar-nebular.component';

describe('ProgressBarNebularComponent', () => {
  let component: ProgressBarNebularComponent;
  let fixture: ComponentFixture<ProgressBarNebularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressBarNebularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarNebularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
