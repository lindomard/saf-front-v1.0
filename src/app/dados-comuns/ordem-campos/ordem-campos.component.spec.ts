import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemCamposComponent } from './ordem-campos.component';

describe('OrdemCamposComponent', () => {
  let component: OrdemCamposComponent;
  let fixture: ComponentFixture<OrdemCamposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdemCamposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdemCamposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
