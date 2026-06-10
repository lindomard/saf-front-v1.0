import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfdSemXmlModalComponent } from './efd-sem-xml-modal.component';

describe('EfdSemXmlModalComponent', () => {
  let component: EfdSemXmlModalComponent;
  let fixture: ComponentFixture<EfdSemXmlModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EfdSemXmlModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EfdSemXmlModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
