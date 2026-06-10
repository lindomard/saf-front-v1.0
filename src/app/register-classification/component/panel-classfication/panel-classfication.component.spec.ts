import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PanelClassficationComponent } from './panel-classfication.component';

describe('PanelClassficationComponent', () => {
  let component: PanelClassficationComponent;
  let fixture: ComponentFixture<PanelClassficationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelClassficationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelClassficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
