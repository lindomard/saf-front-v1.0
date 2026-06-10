import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDadosTabelaConsultaComponent } from './config-dados-tabela-consulta.component';

describe('ConfigDadosTabelaConsultaComponent', () => {
  let component: ConfigDadosTabelaConsultaComponent;
  let fixture: ComponentFixture<ConfigDadosTabelaConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigDadosTabelaConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigDadosTabelaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
