import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { ProgressBarShowComponent } from '@base-shared/progress-bar-full/progress-bar-show.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';
import { ViaCepModel } from '@register/data/model/viacep.model';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { SnotifyService } from 'ng-snotify';
import { DadosPessoasModel } from './model/dados-pessoas-atraves-do-cnpj-model';
import { Response } from '@base-core/model/response.model';
import { CadPessoasModel } from './model/cadpessoasModel';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { CadservicosModel } from './model/cadservicosModel';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { ParametrosDados } from '../dados-comuns/model/CamposParaFiltros';

@Injectable({
  providedIn: 'root'
})
export class CadpessoasService {

  constructor(private api: ApiCreateHttpclienteService
    ) {

  }



  CadpessoasSalvar(cadpessoasModel: CadPessoasModel): Observable<Response> {
    let url = "cadpessoasSaveUpdate";
    return this.api.put(url, cadpessoasModel);
  }

  PegarDadosAtravesDoCep(pCep: string): Observable<ViaCepModel> {
    let url = "viacep?cep=" + FuncoesGerais.soNumero(pCep);

    return this.api.get(url);
  }



  PegarDadosAtravesDoCnpj(pCnpj: string): Observable<DadosPessoasModel> {
    let url = "dadosAtravesDoCnpj?cnpj=" + FuncoesGerais.soNumero(pCnpj);

    return this.api.get(url);
  }


  cadServicosGetList(parametrosDados: ParametrosDados): Observable<CadservicosModel[]> {
    let url = "cadservicosGetList";
    return this.api.post(url, parametrosDados);
  }

  cadpesoasGetList(parametrosDados: ParametrosDados): Observable<Response> {
    let url = "cadpessoasGetList";
    return this.api.post(url, parametrosDados);
  }

  // validar senha

  /*
    public CpCuSenhaConfere(): AsyncValidatorFn {
      return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
        if (control.parent == null) {
          return new Observable(obs => {
            obs.next(null);
            obs.complete();
          });
  
  
          //      control.parent.get("puSenhaConfirmacao").setValue("");      
          //    let puSenhaConfirma = control.parent.get("puSenhaConfirmacao").value;
          //      console.log('valor de constron ', control.value, ' valor confirma ',control.parent.get("puSenhaConfirmacao").value)
  
          //      if (control.value != puSenhaConfirma) {
          return new Observable(obs => {
            obs.next({  });
            obs.complete();
          });
        }
  
  
  
  
      }
    }
  
  */
  public CpCuSenhaConfirmaConfere(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      if (control.parent == null) {
        return new Observable(obs => {
          obs.next(null);
          obs.complete();
        });
      }
      let puSenha = control.parent.get("puSenha").value;

      if (control.value != puSenha) {

        return new Observable(obs => {
          obs.next({ 'erro': ' Confirmação Invalida! ' });
          obs.complete();
        });
      } else {
        return new Observable(obs => {
          obs.next(null);
          obs.complete();
        });

      }


      //      obs.next({ 'userNameExists': true, 'errorName': ' Confirmação Invalida! ' });
//      { 'erro': 'cpf invalido!'}
      //obs.next(new ErroState('Usuário invalido!'));


    }
  }


}

