import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarPeriodosComponent } from './selecionar-periodos-sintegra.component';

describe('SelecionarPeriodosComponent', () => {
  let component: SelecionarPeriodosComponent;
  let fixture: ComponentFixture<SelecionarPeriodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecionarPeriodosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionarPeriodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
