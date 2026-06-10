import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarCadrc170SefazComponent } from './gerar-cadrc170-sefaz.component';

describe('GerarCadrc170SefazComponent', () => {
  let component: GerarCadrc170SefazComponent;
  let fixture: ComponentFixture<GerarCadrc170SefazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerarCadrc170SefazComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerarCadrc170SefazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
