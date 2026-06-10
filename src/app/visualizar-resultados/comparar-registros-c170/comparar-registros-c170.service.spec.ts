import { TestBed } from '@angular/core/testing';

import { CompararRegistrosC170Service } from './comparar-registros-c170.service';

describe('CompararRegistrosC170Service', () => {
  let service: CompararRegistrosC170Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompararRegistrosC170Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
