import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompararRegistrosC170Component } from './comparar-registros-c170.component';

describe('CompararRegistrosC170Component', () => {
  let component: CompararRegistrosC170Component;
  let fixture: ComponentFixture<CompararRegistrosC170Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompararRegistrosC170Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompararRegistrosC170Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
