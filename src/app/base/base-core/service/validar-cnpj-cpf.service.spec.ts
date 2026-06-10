import { TestBed } from '@angular/core/testing';

import { ValidarCnpjCpfService } from './validar-cnpj-cpf.service';

describe('ValidarCnpjCpfService', () => {
  let service: ValidarCnpjCpfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarCnpjCpfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
