import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoXCfopComponent } from './produto-x-cfop.component';

describe('ProdutoXCfopComponent', () => {
  let component: ProdutoXCfopComponent;
  let fixture: ComponentFixture<ProdutoXCfopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoXCfopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoXCfopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
