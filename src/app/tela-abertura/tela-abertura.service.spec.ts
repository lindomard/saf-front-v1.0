import { TestBed } from '@angular/core/testing';

import { TelaAberturaService } from './tela-abertura.service';

describe('TelaAberturaService', () => {
  let service: TelaAberturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelaAberturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
