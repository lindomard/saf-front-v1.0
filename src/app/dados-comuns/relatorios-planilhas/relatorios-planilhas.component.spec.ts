import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosPlanilhasComponent } from './relatorios-planilhas.component';

describe('RelatoriosPlanilhasComponent', () => {
  let component: RelatoriosPlanilhasComponent;
  let fixture: ComponentFixture<RelatoriosPlanilhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatoriosPlanilhasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatoriosPlanilhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
