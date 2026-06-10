import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarCidadesService {

  constructor() { }


  public LNomeExiste(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      let id = (control.value == undefined || control.value == null ? -999 : control.value);


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
