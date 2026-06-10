import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-modal-demo',
  templateUrl: './modal-demo.component.html',
  styleUrls: ['./modal-demo.component.scss']
})
export class ModalDemoComponent {
  constructor(
    private dialogService: NbDialogService,
    private loadingService: LoadingService
  ) {}

  openModal() {
    const dialogRef = this.dialogService.open(ModalContentComponent, {
      hasBackdrop: true,
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });

    this.loadingService.processData().subscribe(() => {
      dialogRef.close();
    });
  }
}

export class ModalContentComponent {}
