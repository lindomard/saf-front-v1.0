import { Component, Input, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
  selector: 'ge-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent extends SimpleModalComponent<{}, boolean> implements OnInit {

  title: string = 'Confirmação de Ação';
  message: string = 'Por favor, confirme sua decisão para prosseguir. Esta ação é irreversível.';

  ngOnInit(): void {
  }

  fechar(confirmation: boolean) {
    this.result = confirmation;
    this.close();
  }


}
