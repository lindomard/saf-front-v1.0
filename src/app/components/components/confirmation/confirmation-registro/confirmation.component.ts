import { Component, Input, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
  selector: 'ge-confirmation-registro',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationRegistroComponent extends SimpleModalComponent<{},  'yes' | 'no' | 'cancel'> implements OnInit {

  title: string = 'O registro atual não está gravado!';
  message: string = 'Deseja gravar agora?';

  ngOnInit(): void {
  }


  fechar(result: 'yes' | 'no' | 'cancel') {
    this.result = result;
    this.close();
  }

  onClose() {
    this.result = 'cancel';
  }

}
