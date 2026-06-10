import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDecimaisCustomComponent } from './input-decimais-custom.component';

describe('InputDecimaisCustomComponent', () => {
  let component: InputDecimaisCustomComponent;
  let fixture: ComponentFixture<InputDecimaisCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDecimaisCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDecimaisCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
