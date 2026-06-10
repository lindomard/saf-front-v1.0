import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadpessoasNavbarComponent } from './cadpessoas-navbar.component';


describe('CadpessoasNavbarComponent', () => {
  let component: CadpessoasNavbarComponent;
  let fixture: ComponentFixture<CadpessoasNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadpessoasNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadpessoasNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
