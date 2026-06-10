import { TestBed } from '@angular/core/testing';

import { RetaguardaVisualizarResultadosService } from './retaguarda-visualizar-resultados.service';

describe('RetaguardaVisualizarResultadosService', () => {
  let service: RetaguardaVisualizarResultadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetaguardaVisualizarResultadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
