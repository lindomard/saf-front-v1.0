import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cadrc170GetComponent } from './cadrc170-get.component';

describe('Cadrc170GetComponent', () => {
  let component: Cadrc170GetComponent;
  let fixture: ComponentFixture<Cadrc170GetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cadrc170GetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cadrc170GetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
