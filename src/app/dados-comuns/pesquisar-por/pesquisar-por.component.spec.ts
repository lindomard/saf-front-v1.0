import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarPorComponent } from './pesquisar-por.component';

describe('PesquisarPorComponent', () => {
  let component: PesquisarPorComponent;
  let fixture: ComponentFixture<PesquisarPorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisarPorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesquisarPorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
