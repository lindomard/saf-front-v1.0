import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAnimateComponent } from './image-animate.component';

describe('ImageAnimateComponent', () => {
  let component: ImageAnimateComponent;
  let fixture: ComponentFixture<ImageAnimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAnimateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageAnimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
