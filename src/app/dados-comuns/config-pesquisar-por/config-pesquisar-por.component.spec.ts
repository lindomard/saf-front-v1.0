import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPesquisarPorComponent } from './config-pesquisar-por.component';

describe('ConfigPesquisarPorComponent', () => {
  let component: ConfigPesquisarPorComponent;
  let fixture: ComponentFixture<ConfigPesquisarPorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigPesquisarPorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPesquisarPorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
