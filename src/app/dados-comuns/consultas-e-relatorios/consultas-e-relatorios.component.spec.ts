import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasERelatoriosComponent } from './consultas-e-relatorios.component';

describe('ConsultasERelatoriosComponent', () => {
  let component: ConsultasERelatoriosComponent;
  let fixture: ComponentFixture<ConsultasERelatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultasERelatoriosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultasERelatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
