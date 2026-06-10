import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoGeracaoArquivosComponent } from './historico-geracao-arquivos.component';

describe('HistoricoGeracaoArquivosComponent', () => {
  let component: HistoricoGeracaoArquivosComponent;
  let fixture: ComponentFixture<HistoricoGeracaoArquivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoGeracaoArquivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoGeracaoArquivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
