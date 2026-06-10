import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompararCelulasDuasCelXlsxComponent } from './comparar-celulas-duas-cel-xlsx.component';

describe('CompararCelulasDuasCelXlsxComponent', () => {
  let component: CompararCelulasDuasCelXlsxComponent;
  let fixture: ComponentFixture<CompararCelulasDuasCelXlsxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompararCelulasDuasCelXlsxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompararCelulasDuasCelXlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
