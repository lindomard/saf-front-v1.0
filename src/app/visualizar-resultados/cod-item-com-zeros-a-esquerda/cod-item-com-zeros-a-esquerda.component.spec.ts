import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodItemComZerosAEsquerdaComponent } from './cod-item-com-zeros-a-esquerda.component';

describe('CodItemComZerosAEsquerdaComponent', () => {
  let component: CodItemComZerosAEsquerdaComponent;
  let fixture: ComponentFixture<CodItemComZerosAEsquerdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodItemComZerosAEsquerdaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodItemComZerosAEsquerdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
