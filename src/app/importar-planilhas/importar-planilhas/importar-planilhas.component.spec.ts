import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarPlanilhasComponent } from './importar-planilhas.component';

describe('ImportarPlanilhasComponent', () => {
  let component: ImportarPlanilhasComponent;
  let fixture: ComponentFixture<ImportarPlanilhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportarPlanilhasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportarPlanilhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
