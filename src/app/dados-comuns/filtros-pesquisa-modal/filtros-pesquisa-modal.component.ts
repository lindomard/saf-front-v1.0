import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CadTableFilpadCamposModel } from 'src/app/genericos/model/CadTableFilpadCamposModel';
import { CamposParaFiltros } from '../model/CamposParaFiltros';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemSelectIdStr } from '@base-shared/select/select.component';
import { getCondicoesNumeroDataArray, getCondicoesStringArray, getCondicoesTodasArray, getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { getFormValidationErrors } from '@base-core/function/validar-forms';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { ItemAddComponent } from '@base-core/component-dialog/item-component';
import { PesquisarPorComponent } from '../pesquisar-por/pesquisar-por.component';
import { CadTableFilpadCabModel } from 'src/app/genericos/model/CadTableFilpadCabModel';

@Component({
  selector: 'app-filtros-pesquisa-modal',
  templateUrl: './filtros-pesquisa-modal.component.html',
  styleUrls: ['./filtros-pesquisa-modal.component.scss']
})
export class FiltrosPesquisaModalComponent implements OnInit, OnChanges {

//  @Input() camposConsultaPor = [];



  @Output() fAtualizaAtualizarHistorico: EventEmitter<any> = new EventEmitter<any>();

  @Input() dataSourcecamposParaFiltrosList = new MatTableDataSource<CamposParaFiltros>([]);
  @Input() dataSourceTableFilpadCab_par: CadTableFilpadCabModel = {};
  dataSourceTableFilpadCab: CadTableFilpadCabModel = {};

  //  @ViewChild('instancePesquisarPor', { static: true }) instancePesquisarPor: PesquisarPorComponent;


  type: String = 'number';

  public condicoesDosCampos = [];
  condicoesTodas = getCondicoesTodasArray();


  tipoCondicao: ItemSelectIdStr[];

  @ViewChild('tableCamposFiltros', { static: true }) tableCamposFiltros: MatTable<CamposParaFiltros>;

  displayColumnsCamposIndices: string[] = ['relacionarCondicao', 'nomeDoCampo', 'condicao', 'valor', 'grupoFiltro', 'excluir'];

  public formfiltro: FormGroup = new FormGroup({
    relacionarCondicao: new FormControl(' and ', [Validators.required]),
    nomeDoCampo: new FormControl('', [Validators.required]),
    condicao: new FormControl(FuncoesGerais.Igual, [Validators.required]),
    valor: new FormControl('', [Validators.required]),
    grupoFiltro: new FormControl('1', [Validators.required, Validators.min(1)])

  });

  constructor(private cd: ChangeDetectorRef,
    private snotifyService: SnotifyService) { }

  /*
    constructor(
      public dialogRef: MatDialogRef<FiltrosPesquisaModalComponent>,
      @Inject(MAT_DIALOG_DATA) public dados: any
  
  ) { this.dialogRef.disableClose = true;}
  
  */

  tipoEvento = "Filtros Adicionais";

  ngOnInit(): void {
    this.condicoesDosCampos = getCondicoesStringArray();
    this.tipoCondicao = getRelacionarCondicao();

  }


  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSourceTableFilpadCab_par'] && this.dataSourceTableFilpadCab_par.cadTableFilpadCampos ) {
      this.dataSourceTableFilpadCab = this.dataSourceTableFilpadCab_par;

      this.dataSourceTableFilpadCab_par.cadTableFilpadCampos = this.dataSourceTableFilpadCab_par.cadTableFilpadCampos.sort((a, b) =>
      
       String(a.tfpcDescricaoCustom).localeCompare(String(b.tfpcDescricaoCustom))
    );

    console.log('passou no sort')


    }
  }



  
  cancelarESair() {
    //    this.dialogRef.close();

  }

  dropTableIndicesCampos(event: CdkDragDrop<CamposParaFiltros[]>) {
    const prevIndex = this.dataSourceTableFilpadCab.cadTableFilpadCampos.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSourceTableFilpadCab.cadTableFilpadCampos, prevIndex, event.currentIndex);
    this.tableCamposFiltros.renderRows();

  }

  clickCamposDaTabela() {

  }
  validar() {

  }

  clickcamposConsultaPor(event) {
    if (this.dataSourceTableFilpadCab.cadTableFilpadCampos.length > 0) {
      this.type = this.dataSourceTableFilpadCab.cadTableFilpadCampos[event].tfpcTipoCampo;
      if (this.type === "date" || this.type === "datetime-local" || this.type === "number") {
        this.condicoesDosCampos = getCondicoesNumeroDataArray();
      } else {
        this.condicoesDosCampos = getCondicoesStringArray();
      }


    }
  }



  fVerificaFormatacaoValorDoCampo(pCampo: string, pValor: string): String {

    if (this.dataSourceTableFilpadCab.cadTableFilpadCampos.length > 0) {
      let index = this.dataSourceTableFilpadCab.cadTableFilpadCampos.findIndex(x => x.tfpcNomeCampo == pCampo);
      this.type = this.dataSourceTableFilpadCab.cadTableFilpadCampos[index].tfpcTipoCampo;
      if (this.type === "date" || this.type === "datetime-local") {
//        return pValor;
        return FuncoesGerais.convertDateTimeStr(pValor);
      }
      else {
        return pValor;
      }



    } else {
      return pValor;
    }



  }


  fAdicionar() {

    if (this.getFormValido(this.formfiltro)) {


      console.log('qtd antes adicionar ', this.dataSourcecamposParaFiltrosList.data.length);
      let camposParaFiltros: CamposParaFiltros = {};

      camposParaFiltros.relacionarCondicao = this.formfiltro.get("relacionarCondicao").value;
      camposParaFiltros.nomeDoCampo = this.formfiltro.get("nomeDoCampo").value;
      camposParaFiltros.condicao = this.formfiltro.get("condicao").value;
      camposParaFiltros.valor =
        this.fVerificaFormatacaoValorDoCampo(this.formfiltro.get("nomeDoCampo").value,
          this.formfiltro.get("valor").value);
      camposParaFiltros.grupoFiltro = this.formfiltro.get("grupoFiltro").value;
      const keys = Object.keys(camposParaFiltros);


      const result = this.dataSourcecamposParaFiltrosList.data.filter(item => keys.every(
        filtro => (camposParaFiltros[filtro] == item[filtro])))
      if (result.length > 0) {
        this.snotifyService.warning("Existe outro filtro com as mesmas caracteristicas. É invalido! result [" + result + "]");
        return;

      }

      if (this.fVerificaAndComMesmoCampo(camposParaFiltros)==false) {
        return;
      }



      this.dataSourcecamposParaFiltrosList.data.push(camposParaFiltros);

      this.tableCamposFiltros.renderRows();

      console.log('qtd antes depois ', this.dataSourcecamposParaFiltrosList.data.length);

      this.cd.detectChanges();
      this.fAtualizaAtualizarHistorico.emit("");
    }
  }
  fVerificaAndComMesmoCampo(camposParaFiltros: CamposParaFiltros): boolean {

    if (camposParaFiltros.relacionarCondicao != ' and ') {
      return true;

    }
    let mResposta: boolean = true;
    this.dataSourcecamposParaFiltrosList.data.forEach(item => {
      if (item.relacionarCondicao == ' and ' && item.nomeDoCampo == camposParaFiltros.nomeDoCampo) {
        this.snotifyService.warning("Existe outra condição com e para o mesmo campo é invalido!");
        mResposta = false;
        return;
      }
    })
    return mResposta;

  }


  fValorENomeDoCampoParaformatar(pValor: CadTableFilpadCamposModel, pNomeCampo: string) {

    if (pNomeCampo == "relacionarCondicao") {
      let index = this.tipoCondicao.findIndex(x => x.id == pValor[pNomeCampo]);
      return this.tipoCondicao[index].name;
    } else if (pNomeCampo == "nomeDoCampo") {
      let index = this.dataSourceTableFilpadCab.cadTableFilpadCampos.findIndex(x => x.tfpcNomeCampo == pValor[pNomeCampo]);
      return this.dataSourceTableFilpadCab.cadTableFilpadCampos[index].tfpcDescricaoCustom;

    } else if (pNomeCampo == "condicao") {
      let index = this.condicoesTodas.findIndex(x => x.id == pValor[pNomeCampo]);
      return this.condicoesTodas[index].name;


    } else {

      return pValor[pNomeCampo];
    }


    /*
    let mValor: String = "";

    let mNomeCampoTemp: string = pNomeCampo;
    let pValorTemp = pValor;

    while (mNomeCampoTemp.indexOf(".") > 0) {
      let mNome = mNomeCampoTemp.substring(0, mNomeCampoTemp.indexOf("."));
      //      console.log("nome dentro a retirar " + mNome);
      mNomeCampoTemp = mNomeCampoTemp.replace(mNome + ".", "");
      //    console.log('DESCRICAO ITEM  ', pValorTemp[mNome]);
      pValorTemp = pValorTemp[mNome];
    }


    mValor = pValorTemp[mNomeCampoTemp];
    let mIndex = this.captionColumns.findIndex(x => x.name === pNomeCampo);
    if (mIndex > -1) {

      let mTipoCampo: String = this.captionColumns[mIndex].mask;


      return this.fRetornaFormatado(mValor, mTipoCampo);
    } else {
      console.log('nao encontrado no index ', pNomeCampo)
    }
*/
  }


  excluir(idx: number) {

    const data = this.dataSourcecamposParaFiltrosList.data;


    let mensagem = "Quer realmente excluir o registro";
    this.snotifyService.confirm(mensagem, 'Confirmação', {
      timeout: 5000,
      position: SnotifyPosition.centerCenter,
      showProgressBar: true,
      closeOnClick: true,

      pauseOnHover: true,
      buttons: [
        {
          text: 'Sim', action: () => {
            data.splice(idx, 1);
            this.dataSourcecamposParaFiltrosList.data = data;
          }
        },
        { text: 'Não', action: () => console.log('Clicked: No') },
      ]
    });
  }

  getFormValido(form: FormGroup): boolean {
    let mErros: string = "";

    if (form.valid == false) {
      form.hasError;
      form.setValidators;
      mErros = getFormValidationErrors(form) + "\n";

      this.snotifyService.warning(mErros);
      return false;

    } return true;


  }


}
