import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarDadosIniciaisComponent } from './importar-dados-iniciais.component';

describe('ImportarDadosIniciaisComponent', () => {
  let component: ImportarDadosIniciaisComponent;
  let fixture: ComponentFixture<ImportarDadosIniciaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportarDadosIniciaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportarDadosIniciaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
