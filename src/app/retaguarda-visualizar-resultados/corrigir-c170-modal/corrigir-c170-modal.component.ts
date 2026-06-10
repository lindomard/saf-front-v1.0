import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovimentoProdServModel } from '../model/MovimentoProdServModel';
import { observable } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { safeCall } from '@base-core/safe-call';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { SessionService } from '@base-core/session/session.service';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { GenericosService } from 'src/app/genericos/genericos.service';
import { Cadr0200UnicoResumidoModel } from '../model/Cadr0200UnicoResumidoModel';
import { SnotifyService } from 'ng-snotify';
import { map } from 'rxjs/operators';
import { getFormValidationErrors, validarForm } from '@base-core/function/validar-forms';
import { Cadrc170AtualizarModel } from '../model/Cadrc170AtualizarModel ';

@Component({
  selector: 'app-corrigir-c170-modal',
  templateUrl: './corrigir-c170-modal.component.html',
  styleUrls: ['./corrigir-c170-modal.component.scss']
})
export class CorrigirC170ModalComponent implements OnInit {

  dadosCorrecao = "Corrigir Registros C170";

  constructor(private fb: FormBuilder,
    public dialogRefC170: MatDialogRef<CorrigirC170ModalComponent>,
    private session: SessionService,
    @Inject(MAT_DIALOG_DATA) public dadosC170: any,
    private genericosService: GenericosService
    , private snotifyService: SnotifyService

  ) { }

  public formCadrc170: FormGroup;


  ngOnInit(): void {

    this.gerarForm();


  }


  gerarForm() {
    this.formCadrc170 = this.fb.group({
      chaveId: [{ value: '', disabled: true }, []],
      origem: [{ value: '', disabled: true }, []],

      rc170CodItemOriginal: [{ value: '', disabled: true }, []],
      rc170CodItemAnt: [{ value: '', disabled: true }, []],
      
      r0200DescrItemOriginal: [{ value: '', disabled: true }, []],
      r0200UnidInvOriginal: [{ value: '', disabled: true }, []],
      rc170QtdOriginal: [{ value: '', disabled: true }, []],
      rc170QtdAnt: [{ value: '', disabled: true }, []],
      rc170CodItem: ['', [Validators.required, Validators.minLength(3)], [this.fValidarItemNovo()]],
      //      cpCnpj: ['', [Validators.required, Validators.minLength(3)], [this.validarCnpjCpf.validarCnpj()]],

      r0200DescrItem: [{ value: '', disabled: true }, []],
      r0200UnidInv: [{ value: '', disabled: true }, []],
      rc170Qtd: ['', [Validators.required, Validators.min(1), Validators.required, Validators.max(99999999999)]],
      rc170VlItem: [{ value: '', disabled: true }, []],
      rc170DtMov: [{ value: '', disabled: true }, []],
      rc170ChvNfe: [{ value: '', disabled: true }, []],
      rc170CodSit: [{ value: '', disabled: true }, []],
      rc170Id: [{ value: '', disabled: true }, []],
      rc170IdPessoa: [{ value: '', disabled: true }, []],
      rc170Origem: [{ value: '', disabled: true }, []],
      r0200CodNcmOriginal: [{ value: '', disabled: true }, []],
      r0200CestOriginal: [{ value: '', disabled: true }, []],
      r0200CodNcm: [{ value: '', disabled: true }, []],
      r0200Cest: [{ value: '', disabled: true }, []],





    });
    this.fCarregarForm(this.dadosC170.movimentoProdServModel);
  }
  fCarregarForm(movimentoProdServModel: MovimentoProdServModel) {


    this.formCadrc170.get("chaveId").setValue(movimentoProdServModel.chaveId);
    this.formCadrc170.get("origem").setValue(movimentoProdServModel.origem);

    this.formCadrc170.get("rc170CodItemOriginal").setValue(movimentoProdServModel.rc170CodItemOriginal);
    this.formCadrc170.get("r0200DescrItemOriginal").setValue(movimentoProdServModel.r0200DescrItemOriginal);
    this.formCadrc170.get("r0200UnidInvOriginal").setValue(movimentoProdServModel.r0200UnidInvOriginal);
    this.formCadrc170.get("rc170QtdOriginal").setValue(movimentoProdServModel.rc170QtdOriginal);
    this.formCadrc170.get("r0200CodNcmOriginal").setValue(movimentoProdServModel.r0200CodNcmOriginal);
    this.formCadrc170.get("r0200CestOriginal").setValue(movimentoProdServModel.r0200CestOriginal);



    this.formCadrc170.get("rc170CodItem").setValue(movimentoProdServModel.rc170CodItem);
    this.formCadrc170.get("rc170CodItemAnt").setValue(movimentoProdServModel.rc170CodItem);
    this.formCadrc170.get("r0200DescrItem").setValue(movimentoProdServModel.r0200DescrItem);
    this.formCadrc170.get("r0200UnidInv").setValue(movimentoProdServModel.r0200UnidInv);
    this.formCadrc170.get("rc170Qtd").setValue(movimentoProdServModel.rc170Qtd);
    this.formCadrc170.get("rc170QtdAnt").setValue(movimentoProdServModel.rc170Qtd);

    this.formCadrc170.get("r0200CodNcm").setValue(movimentoProdServModel.r0200CodNcm);
    this.formCadrc170.get("r0200Cest").setValue(movimentoProdServModel.r0200Cest);


    this.formCadrc170.get("rc170VlItem").setValue(movimentoProdServModel.rc170VlItem);
    this.formCadrc170.get("rc170DtMov").setValue(movimentoProdServModel.rc170DtMov);
    this.formCadrc170.get("rc170ChvNfe").setValue(movimentoProdServModel.rc170ChvNfe);
    this.formCadrc170.get("rc170CodSit").setValue(movimentoProdServModel.rc170CodSit);
    this.formCadrc170.get("rc170Id").setValue(movimentoProdServModel.rc170Id);
    this.formCadrc170.get("rc170IdPessoa").setValue(movimentoProdServModel.rc170IdPessoa);
    this.formCadrc170.get("rc170Origem").setValue(movimentoProdServModel.rc170Origem);
    this.formCadrc170.get("r0200DescrItemOriginal").setValue(movimentoProdServModel.r0200DescrItemOriginal);

  }


  getMaskForm(qtdDec) {

    return "separator." + qtdDec;


  }

  getAlinhar(pDirecao) {

    if (pDirecao === "D") {
      return "text-align:right";
    } else if (pDirecao === "C") {
      return "text-align:center";
    } else
      return "text-align:left";

  }



  cancelarESairC170() {
    this.dialogRefC170.close(null);
  }

  gravarESairC170() {

    let mErros: string = "";

    if (this.formCadrc170.valid == false) {
      this.formCadrc170.hasError;
      this.formCadrc170.setValidators;
      mErros = getFormValidationErrors(this.formCadrc170) + "\n";
    }

    if (mErros.length > 0) {
      validarForm(this.formCadrc170);
      this.snotifyService.info(mErros);

    } else {
      let cadrc170AtualizarModel: Cadrc170AtualizarModel = {};
      cadrc170AtualizarModel.rc170Id = this.formCadrc170.get("rc170Id").value;
      cadrc170AtualizarModel.rc170IdPessoa = this.formCadrc170.get("rc170IdPessoa").value;
      cadrc170AtualizarModel.rc170CodItemAnt = this.formCadrc170.get("rc170CodItemAnt").value;
      cadrc170AtualizarModel.rc170CodItemNovo = this.formCadrc170.get("rc170CodItem").value;
      cadrc170AtualizarModel.rc170QtdAnt = this.formCadrc170.get("rc170QtdAnt").value;
      cadrc170AtualizarModel.rc170QtdNova = this.formCadrc170.get("rc170Qtd").value;

      this.dialogRefC170.close(cadrc170AtualizarModel);
    }
  }

  fValidarItemNovo(): AsyncValidatorFn {

    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {

      if (control.value == undefined || control.value == null || control.parent == null) {
        return null;
      }

      let pCodItem = control.value;
      let filtrosGenericosLista: FiltrosGenericosModel[] = [];

      safeCall(pCodItem, () => {
        filtrosGenericosLista = new
          AdicionarFiltrosGenericos(filtrosGenericosLista, "r0200CodItem",
            FuncoesGerais.Igual, pCodItem,
            1, getRelacionarCondicao()[0].id).adicionarfiltros();
      })

      filtrosGenericosLista = new
        AdicionarFiltrosGenericos(filtrosGenericosLista, "r0200IdPessoa",
          FuncoesGerais.Igual, this.session.companyId,
          1, getRelacionarCondicao()[0].id).adicionarfiltros();




      let parametrosDados: ParametrosDados = {};
      parametrosDados.filtrosGenericosList = filtrosGenericosLista;



      return this.genericosService.buscarDadosGenericos("cadr0200UnicoResumidoGet", parametrosDados)

        .pipe(
          map(res => {
            if (!res.objeto.length) {
              control.parent.get("r0200DescrItem").setValue("");
              control.parent.get("r0200UnidInv").setValue("");

              return { 'erro': 'Codigo ' + pCodItem + ' não cadastrado!' };
            }
            if (res.objeto.length < 1) {
              control.parent.get("r0200DescrItem").setValue("");
              control.parent.get("r0200UnidInv").setValue("");
              control.parent.get("r0200CodNcm").setValue("");
              control.parent.get("r0200Cest").setValue("");

            } else {
              control.parent.get("r0200DescrItem").setValue(res.objeto[0].r0200DescrItem);
              control.parent.get("r0200UnidInv").setValue(res.objeto[0].r0200UnidInv);
              control.parent.get("r0200CodNcm").setValue(res.objeto[0].r0200CodNcm);
              control.parent.get("r0200Cest").setValue(res.objeto[0].r0200Cest);

            }
            return null

          })

        );


    };


    /*
    
          return new Observable(obs => {
            obs.next(this.fExiste(codItem));
            obs.complete();
          });
    */
    //    };



  }
  /*

  fExiste(pCodItem) {
    // inicio buscar dados




    let filtrosGenericosLista: FiltrosGenericosModel[] = [];

    safeCall(pCodItem, () => {
      filtrosGenericosLista = new
        AdicionarFiltrosGenericos(filtrosGenericosLista, "r0200CodItem",
          FuncoesGerais.Igual, pCodItem,
          1, getRelacionarCondicao()[0].id).adicionarfiltros();
    })

    filtrosGenericosLista = new
      AdicionarFiltrosGenericos(filtrosGenericosLista, "r0200IdPessoa",
        FuncoesGerais.Igual, this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();




    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = filtrosGenericosLista;

    // inicio

    // termino




    this.genericosService.buscarDadosGenericos("cadr0200UnicoResumidoGet", parametrosDados)
      .subscribe((Response) => {

        safeCall(Response, () => {
          if (Response.success) {

            let cadr0200UnicoResumidoModel: Cadr0200UnicoResumidoModel[] = [];

            cadr0200UnicoResumidoModel = [...Response.objeto];
            if (cadr0200UnicoResumidoModel.length < 1) {
              this.formCadrc170.get("r0200DescrItem").setValue("");
              this.formCadrc170.get("r0200UnidInv").setValue("");
              return { 'erro': 'Codigo ' + pCodItem + ' não cadastrado!' }



            } else {
              this.formCadrc170.get("r0200DescrItem").setValue(cadr0200UnicoResumidoModel[0].r0200DescrItem);
              this.formCadrc170.get("r0200UnidInv").setValue(cadr0200UnicoResumidoModel[0].r0200UnidInv);
              return null;

            }



          } else {

            return { 'erro': 'Codigo ' + pCodItem + ' não cadastrado!' }
          }


        })

      }, error => {
        return { 'erro': 'Codigo ' + pCodItem + ' não cadastrado! ERRO ' + error.error.message }

      }
      )




  }
*/
}
