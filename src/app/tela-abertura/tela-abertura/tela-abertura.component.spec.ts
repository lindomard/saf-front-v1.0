import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteTalaComponent } from './tela-abertura.component';

describe('TesteTalaComponent', () => {
  let component: TesteTalaComponent;
  let fixture: ComponentFixture<TesteTalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteTalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteTalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
