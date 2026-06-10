import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Alert } from './model/alert.model';

@Component({
  selector: 'app-formulario1',
  templateUrl: './formulario1.component.html',
  styleUrls: ['./formulario1.component.scss']
})
export class Formulario1Component implements OnInit {

  constructor( ) { }

  public mErroNome: string = "";
  public formulario: UntypedFormGroup = new UntypedFormGroup({
    nome:      new UntypedFormControl('', [Validators.required, Validators.minLength(3)], [this.LNomeExiste()]),
    sobrenome: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
  });

  alerts: Alert[] = [
    { type: 'success', message: 'Dados estão corretos.' },
    { type: 'danger', message: 'Dados estão invalidos.' }
  ]

  mensagemAlert: Alert | undefined;


  ngOnInit() { }

  /**
   * Fecha a mensagem de alerta.
   */
  close() {
    this.mensagemAlert = undefined;
  }

  /**
   * Exibe mensagem de acordo com status do formulário.
   */
  public validar(): void {
    this.mensagemAlert = (this.formulario.status == 'VALID') ? this.alerts.filter(x => x.type === 'success')[0] : this.alerts.filter(x => x.type === 'danger')[0]
  }

  public LNomeExiste(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      let id = (control.value == undefined || control.value == null ? -999 : control.value);

     this.mErroNome = "Cadastro nao encontrado";


      let mRetorno: any =  { 'userNameExists': true, 'errorName': id + ' id ' + 'res[0].lId' + '  Cadastrado Anteriormente! ' };


      if (control.parent == null || control.parent.parent == null) {
        return new Observable(obs => {
          obs.next(mRetorno);
          obs.complete();
        });
      } else 
      return new Observable();

    };
  }
}



