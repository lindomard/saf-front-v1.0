import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaltarRelatorioPadraoModalComponent } from './saltar-relatorio-padrao-modal.component';

describe('SaltarRelatorioPadraoModalComponent', () => {
  let component: SaltarRelatorioPadraoModalComponent;
  let fixture: ComponentFixture<SaltarRelatorioPadraoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaltarRelatorioPadraoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaltarRelatorioPadraoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
