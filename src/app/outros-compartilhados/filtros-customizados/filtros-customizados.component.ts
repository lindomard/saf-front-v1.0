import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CamposParaFiltrosModel } from '@base-core/model/CamposParaFiltros';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { getCondicoesNumeroDataArray, getCondicoesStringArray } from '@base-shared/funcoesGerais/funcoesDiversas';



@Component({
  selector: 'intersys-filtros-customizados',
  templateUrl: './filtros-customizados.component.html',
  styleUrls: ['./filtros-customizados.component.scss']
})
export class FiltrosCustomizadosComponent implements OnInit {

  @Input() filtrosForm: UntypedFormGroup;
  @Input() camposParaFiltrosModel: CamposParaFiltrosModel;
  @Input() typeDate: string = 'date';
  @Input() typeDateTime: string = 'datetime-local';

  @Output() fBuscarOsDados: EventEmitter<any> = new EventEmitter<any>();

  public readonly submittedValue: EventEmitter<void>;

  public condicaoNumeroData = [];
  public tipoCondicao = [];
  public condicaoString = [];

  tipoDoCampo: string = "string";
  mQtdDec: number = 0;

  constructor(
    private fb: UntypedFormBuilder

  ) { }

  ngOnInit() {
    /*
    safeCall(this.filtrosForm, (it) => {
      it = new FormGroup({});
      console.log('quik')
    });
    */

    this.condicaoNumeroData = getCondicoesNumeroDataArray();


    this.condicaoString = getCondicoesStringArray() ;




  }

  onblurFiltrosCustomizados($event) {
    //    console.log("on blur")

    let tipoCondicao: string = this.filtrosForm.get('tipoCondicao').value;
    let nomeDoCampo: string = this.filtrosForm.get('nomeDoCampo').value;
    let condicao: string = this.filtrosForm.get('condicao').value;
    let valorString: any = this.filtrosForm.get('valorString').value;


    if (tipoCondicao != undefined
      && nomeDoCampo != undefined
      && condicao != undefined
      && valorString != undefined
      && valorString.length > 0
    ) {
      //      console.log("passou pelo tamanho");

      this.addFormControlFiltrosCustomizados(tipoCondicao, nomeDoCampo, condicao, valorString);

      //      console.log("blur ", this.filtrosProd.get('codItem').value);

      this.filtrosForm.get('tipoCondicao').setValue("");
      this.filtrosForm.get('nomeDoCampo').setValue("");
      this.filtrosForm.get('condicao').setValue("");
      this.filtrosForm.get('valorString').setValue("");
    }

  }



  addFormControlFiltrosCustomizados(tipoCondicao, nomeDoCampo, condicao, valorString) {
    this.UpdateFormControlFiltrosCustomizados(tipoCondicao, nomeDoCampo, condicao, valorString);
    let itensArray = this.filtrosForm.controls.filtrosCustomizados as UntypedFormArray;

    let arraylen = itensArray.length;

    let itens: UntypedFormGroup = this.fb.group({
      tipoCondicao: tipoCondicao,
      nomeDoCampo: nomeDoCampo,
      condicao: condicao,
      valorString: valorString,
    })
    itensArray.insert(arraylen, itens);
    this.onClickAtualizar();

  }


  onClickAtualizar() {

    this.fBuscarOsDados.emit();

  }

  UpdateFormControlFiltrosCustomizados(tipoCondicao, nomeDoCampo, condicao, valorString) {

    let itensArray = this.filtrosForm.controls.filtrosCustomizados as UntypedFormArray;
    let arraylen = itensArray.length - 1;
    const myForm = (<UntypedFormArray>this.filtrosForm.get("filtrosCustomizados")).at(arraylen);
    myForm.patchValue({
      tipoCondicao: tipoCondicao,
      nomeDoCampo: nomeDoCampo,
      condicao: condicao,
      valorString: valorString

    });

  }

  nomeDoCampo($event) {

    this.tipoDoCampo = $event.tipoCampo;
    this.mQtdDec = $event.qtdDec;
  }

  removeFormControlFiltrosCustomizados(i) {
    let usersArray = this.filtrosForm.controls.filtrosCustomizados as UntypedFormArray;
    usersArray.removeAt(i);

    this.onClickAtualizar();

  }


  public submitValue(): void {
    this.submittedValue.emit();
  }


  fValorFiltroCustomizado($event) {
    let dataISODataHora;

    try {
      if ($event.length == 16) {
        dataISODataHora = new Date($event);
      } else {
        return $event;
      }
      return FuncoesGerais.convertDateTimeSeg($event);

    } catch (error) {
      return $event;
    }

    //    2022-08-10T22:18

    // let dataISODataHora = new Date($event+":00Z");

    //    console.log('valor filtro customizado ', $event );
    //    return "valor do filtro customizado " +  $event;
  }


}









