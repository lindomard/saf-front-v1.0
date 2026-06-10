import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LerDadosDoPdfComponent } from './ler-dados-do-pdf.component';

describe('LerDadosDoPdfComponent', () => {
  let component: LerDadosDoPdfComponent;
  let fixture: ComponentFixture<LerDadosDoPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LerDadosDoPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LerDadosDoPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
