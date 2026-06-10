import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cadrc100ConsultaComponent } from './cadrc100-consulta.component';

describe('Cadrc100ConsultaComponent', () => {
  let component: Cadrc100ConsultaComponent;
  let fixture: ComponentFixture<Cadrc100ConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cadrc100ConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cadrc100ConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
