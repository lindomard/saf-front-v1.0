import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseEstruturalComponent } from './analise-estrutural.component';

describe('AnaliseEstruturalComponent', () => {
  let component: AnaliseEstruturalComponent;
  let fixture: ComponentFixture<AnaliseEstruturalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaliseEstruturalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaliseEstruturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
