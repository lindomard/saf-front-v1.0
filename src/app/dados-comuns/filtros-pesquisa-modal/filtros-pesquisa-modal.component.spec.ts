import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosPesquisaModalComponent } from './filtros-pesquisa-modal.component';

describe('FiltrosPesquisaModalComponent', () => {
  let component: FiltrosPesquisaModalComponent;
  let fixture: ComponentFixture<FiltrosPesquisaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosPesquisaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosPesquisaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
