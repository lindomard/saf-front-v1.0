import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessarComponent } from './processar.component';

describe('ProcessarComponent', () => {
  let component: ProcessarComponent;
  let fixture: ComponentFixture<ProcessarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
