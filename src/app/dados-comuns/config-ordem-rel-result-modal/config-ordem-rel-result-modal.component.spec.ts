import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigOrdemResultModalComponent } from './config-ordem-rel-result-modalcomponent';


describe('OrdemResultModalComponent', () => {
  let component: ConfigOrdemResultModalComponent;
  let fixture: ComponentFixture<ConfigOrdemResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigOrdemResultModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigOrdemResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
