import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosExecutadosComponent } from './processos-executados.component';

describe('ProcessosExecutadosComponent', () => {
  let component: ProcessosExecutadosComponent;
  let fixture: ComponentFixture<ProcessosExecutadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessosExecutadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessosExecutadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
