import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuSizeComponent } from './menu-size.component';

describe('MenuSizeComponent', () => {
  let component: MenuSizeComponent;
  let fixture: ComponentFixture<MenuSizeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
