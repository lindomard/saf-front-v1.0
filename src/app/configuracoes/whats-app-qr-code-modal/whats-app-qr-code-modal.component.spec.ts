import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsAppQrCodeComponent } from './whats-app-qr-code-modal.component';

describe('WhatsAppQrCodeComponent', () => {
  let component: WhatsAppQrCodeComponent;
  let fixture: ComponentFixture<WhatsAppQrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsAppQrCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsAppQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
