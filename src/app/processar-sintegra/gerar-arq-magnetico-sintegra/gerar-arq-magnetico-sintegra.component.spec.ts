import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarArqMagneticoComponent } from './gerar-arq-magnetico-sintegra.component';

describe('GerarArqMagneticoComponent', () => {
  let component: GerarArqMagneticoComponent;
  let fixture: ComponentFixture<GerarArqMagneticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerarArqMagneticoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerarArqMagneticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
