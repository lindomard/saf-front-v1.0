import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CadEfdSemXmlModel } from '../model/CadEfdSemXmlModel';
import { fieldsProperties } from 'src/app/visualizar-resultados/resultados/resultados.component';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResultService } from '../result.service';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { FilterFields, OrderFields, ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { safeCall } from '@base-core/safe-call';
import { SnotifyService } from 'ng-snotify';
import { SessionService } from '@base-core/session/session.service';
import { getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';

@Component({
  selector: 'app-efd-sem-xml-modal',
  templateUrl: './efd-sem-xml-modal.component.html',
  styleUrls: ['./efd-sem-xml-modal.component.scss'],

})
export class EfdSemXmlModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EfdSemXmlModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: any,
    private resultService: ResultService
    , private snotifyService: SnotifyService
    , private session: SessionService
    , private baixarArquivosService: BaixarArquivosService



  ) { }
  titulo = "Notas Declaradas na Efd Sem Xml Correspondente";
  dataSourceEfdSemXml = new MatTableDataSource<CadEfdSemXmlModel>([]);

  filterPaginatorEfdSemXml: FilterPaginator = {};
  pageLimitOptionsEfdSemXml: Array<number> = [2, 5, 10, 15, 20, 100];


  filtrosGenericosLista: FiltrosGenericosModel[] = [];

  tipoEvento: string = "Aguardando...";

  mDisableGerar: boolean = false;

  isLoading = false;

  captionColumnsEfdSemXml: fieldsProperties[] = [
    { caption: 'Chave Nfe', weight: 18, mask: '', align: 'center', name: 'esxChvNfe' },
    { caption: 'Cód Sit', weight: 4, mask: '', align: 'center', name: 'esxCodSit' },
    { caption: 'Dt Doc', weight: 40, mask: 'date', align: 'center', name: 'esxDtDoc' },
    { caption: 'Valor', weight: 20, mask: 'valor2Dec', align: 'right', name: 'esxVlDoc' },
    { caption: 'Numero Doc', weight: 20, mask: '', align: 'center', name: 'esxNumDoc' },
    { caption: 'Cód Mod', weight: 20, mask: '', align: 'center', name: 'esxCodMod' },
    { caption: 'Série', weight: 20, mask: '', align: 'center', name: 'esxSer' },
    { caption: 'Ind Emit', weight: 20, mask: '', align: 'center', name: 'esxIndEmit' },

  ]
  displayedColumnsEfdSemXml = ['esxChvNfe', 'esxCodSit', 'esxDtDoc', 'esxVlDoc', 'esxNumDoc', 'esxCodMod', 'esxSer', 'esxIndEmit']




  ngOnInit(): void {
    this.filterPaginatorEfdSemXml.page = 0;
    this.filterPaginatorEfdSemXml.size = 10;

    BaixarArquivosService.terminouDownload.subscribe(terminou => {

      if (terminou == true) {
        this.mDisableGerar = false;
        this.hideLoading();
    
        this.tipoEvento = "Aguardando....";
      }
    })



    this.buscarEfdSemXml();
  }



  fRetornaFormatado(pValor: any, pDataMask: String) {
    return new FormatarCamposDastabelas(pValor, pDataMask).formatar();
  }

  // inicio procedure 


  changeStyleEfdSemXml(pNomeCampo) {
    let index = this.captionColumnsEfdSemXml.findIndex(x => x.name == pNomeCampo);
    if (index > -1) {

      let mAlign: String = this.captionColumnsEfdSemXml[index].align;

      if (mAlign === "right") {
        return { 'text-align': 'right' };
      } else if (mAlign === "center") {
        return { 'text-align': 'center' };
      } else
        return { 'text-align': 'left' };
    }

  }


  getColumnNameEfdSemXml(pNomeCampo) {

    let index = this.captionColumnsEfdSemXml.findIndex(x => x.name == pNomeCampo);
    if (index < 0) {
      return
    } else {
      let mCaption: String = this.captionColumnsEfdSemXml[index].caption;

      return mCaption;
    }
  }



  fValorENomeDoCampoParaformatarEfdSemXml(pValor: any, pNomeCampo: string) {

    //    let mValor: String = pValor[pNomeCampo];

    let mValor: String = pValor;


    let mIndex = this.captionColumnsEfdSemXml.findIndex(x => x.name == pNomeCampo);


    let mTipoCampo: String = this.captionColumnsEfdSemXml[mIndex].mask;


    return this.fRetornaFormatado(mValor, mTipoCampo);
  }


  changeEventEfdSemXml(evento: any) {
    this.filterPaginatorEfdSemXml.page = evento.pageIndex;
    this.filterPaginatorEfdSemXml.size = evento.pageSize;
    this.buscarEfdSemXml();
  }


  // termino procedure


  buscarEfdSemXml() {
    this.filtrosGenericosLista = [];
    this.dados.idPessoa;


    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "esxIdPessoa", FuncoesGerais.Igual
        , this.dados.idPessoa, 1, "").adicionarfiltros();


        this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "esxIndEmit", FuncoesGerais.Igual
          , "0", 1, "").adicionarfiltros();

    let mMesano = FuncoesGerais.fInsereEsquerda(this.dados.mes.toString(), "0", 2)
      + FuncoesGerais.fInsereEsquerda(this.dados.ano.toString(), "0", 4);

      if (this.dados.mes===0) {
        mMesano = "";
      }


    if (mMesano.length > 0) {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "esxDtDoc", FuncoesGerais.maiorIgual,
          FuncoesGerais.convertMesAnoToDateJson(true, mMesano), 1, "").adicionarfiltros();


    }

    if (mMesano.length > 0) {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "esxDtDoc", FuncoesGerais.menorIgual,
          FuncoesGerais.convertMesAnoToDateJson(false, mMesano), 1, "").adicionarfiltros();


    }



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.page = this.filterPaginatorEfdSemXml.page;
    parametrosDados.size = this.filterPaginatorEfdSemXml.size;



    this.resultService.cadefdsemxmlGetList(parametrosDados).subscribe((Response) => {



      safeCall(Response.objeto, (cadefdsemxmlModel) => {

        this.dataSourceEfdSemXml.data = [...cadefdsemxmlModel.content];

        this.filterPaginatorEfdSemXml.page = cadefdsemxmlModel.pageable.pageNumber;
        this.filterPaginatorEfdSemXml.size = cadefdsemxmlModel.pageable.pageSize;
        this.filterPaginatorEfdSemXml.totalElements = cadefdsemxmlModel.totalElements;
        this.filterPaginatorEfdSemXml.totalPages = cadefdsemxmlModel.totalPages;


      })
    }, error => {
      this.snotifyService.error(error.error.message);

    }
    )







  }

  fechar() {
    this.dialogRef.close();

  }

  fAdicionarFilterFields(pNomeCampo: string): FilterFields {
    let filterFields: FilterFields = {};
    filterFields.fieldApelido = pNomeCampo;
    return filterFields;


  }
  BaixarPdf() {



    //    this.snotifyService.warning("vai baixar relatorio");
    this.tipoEvento = "Gerando Relatorio...";

    this.mDisableGerar = true;
    this.showLoading();


    this.filtrosGenericosLista = [];
    this.dados.idPessoa;


    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "esxIdPessoa", FuncoesGerais.Igual
        , this.dados.idPessoa, 1, "").adicionarfiltros();

        this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "esxIndEmit", FuncoesGerais.Igual
          , "0", 1, "").adicionarfiltros();
  
    let mMesano = FuncoesGerais.fInsereEsquerda(this.dados.mes.toString(), "0", 2)
      + FuncoesGerais.fInsereEsquerda(this.dados.ano.toString(), "0", 4);

      if (this.dados.mes===0) {
        mMesano = "";
      }



    if (mMesano.length > 0) {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "esxDtDoc", FuncoesGerais.maiorIgual,
          FuncoesGerais.convertMesAnoToDateJson(true, mMesano), 1, "").adicionarfiltros();


    }

    if (mMesano.length > 0) {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "esxDtDoc", FuncoesGerais.menorIgual,
          FuncoesGerais.convertMesAnoToDateJson(false, mMesano), 1, "").adicionarfiltros();


    }




    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "cadefdsemxml"
    let orderFieldsLista: OrderFields[] = [];

    let orderFields: OrderFields = {};
    orderFields.fieldApelido = "esxDtDoc";
    orderFieldsLista.push(orderFields)


    let orderFieldsNumdoc: OrderFields = {};
    orderFieldsNumdoc.fieldApelido = "esxNumDoc";
    orderFieldsLista.push(orderFieldsNumdoc)

    

    parametrosDados.orderFields = orderFieldsLista;

    // inicio

    let filterFieldsLista: FilterFields[] = [];


    filterFieldsLista.push(this.fAdicionarFilterFields("esxCodMod"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxNumDoc"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxCodSit"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxSer"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxChvNfe"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxCnpj"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxDtDoc"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxIndEmit"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxCodPart"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxVlDoc"));



    parametrosDados.filterFields = filterFieldsLista;
    parametrosDados.separadoPor = "";
    parametrosDados.tipoRelatorio = "PDF";
    parametrosDados.origemRelatorio = "cadefdsemxmlRelatorio";
    this.baixarArquivosService.downloadDocumentoPost(parametrosDados);
    // termino





  }

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }

  BaixarPlanilha() {


    this.tipoEvento = "Gerando Relatorio...";

    this.mDisableGerar = true;
    this.showLoading();


    this.filtrosGenericosLista = [];
    this.dados.idPessoa;


    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "esxIdPessoa", FuncoesGerais.Igual
        , this.dados.idPessoa, 1, "").adicionarfiltros();

        this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "esxIndEmit", FuncoesGerais.Igual
          , "0", 1, "").adicionarfiltros();


    let mMesano = FuncoesGerais.fInsereEsquerda(this.dados.mes.toString(), "0", 2)
      + FuncoesGerais.fInsereEsquerda(this.dados.ano.toString(), "0", 4);

      if (this.dados.mes===0) {
        mMesano = "";
      }



    if (mMesano.length > 0) {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "esxDtDoc", FuncoesGerais.maiorIgual,
          FuncoesGerais.convertMesAnoToDateJson(true, mMesano), 1, "").adicionarfiltros();


    }

    if (mMesano.length > 0) {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "esxDtDoc", FuncoesGerais.menorIgual,
          FuncoesGerais.convertMesAnoToDateJson(false, mMesano), 1, "").adicionarfiltros();


    }




    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "cadefdsemxml"
    let orderFieldsLista: OrderFields[] = [];

    let orderFields: OrderFields = {};
    orderFields.fieldApelido = "esxDtDoc";
    orderFieldsLista.push(orderFields)


    let orderFieldsNumdoc: OrderFields = {};
    orderFieldsNumdoc.fieldApelido = "esxNumDoc";
    orderFieldsLista.push(orderFieldsNumdoc)

    

    parametrosDados.orderFields = orderFieldsLista;

    // inicio

    let filterFieldsLista: FilterFields[] = [];


    filterFieldsLista.push(this.fAdicionarFilterFields("esxCodMod"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxNumDoc"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxCodSit"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxSer"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxChvNfe"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxCnpj"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxDtDoc"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxIndEmit"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxCodPart"));
    filterFieldsLista.push(this.fAdicionarFilterFields("esxVlDoc"));



    parametrosDados.filterFields = filterFieldsLista;
    parametrosDados.separadoPor = "";
    parametrosDados.tipoRelatorio = "CSV";
    parametrosDados.origemRelatorio = "Cadefdsemxml";



    this.resultService.BuscarCadEfdSemXmlPlanilhas(parametrosDados)
      .subscribe((response) => {
        safeCall(response.success, () => {

          this.baixarPlanilhas(response.objeto);


        })
      }, error => {
        this.snotifyService.error(error.error.message);
        BaixarArquivosService.terminouDownload.emit(true);

      }
      )





  }


  baixarPlanilhas(nomeDoArquivoGeradoModel: NomeDoArquivoGeradoModel[]) {


    nomeDoArquivoGeradoModel.forEach(obj => {
      if (obj.nomeDoArquivoGerado != null && obj.nomeDoArquivoGerado.length > 0) {
        this.baixarArquivosService.downloadarquivo(obj.nomeDoArquivoGerado);

      }
      BaixarArquivosService.terminouDownload.emit(false)

    });





  }



}
