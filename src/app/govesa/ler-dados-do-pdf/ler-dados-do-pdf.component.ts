import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { GovesaSaidasEntradasCab } from '../model/govesaSaidasEntradasCab';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { SessionService } from '@base-core/session/session.service';
import { Router } from '@angular/router';
import { getFormValidationErrors, validarForm } from '@base-core/function/validar-forms';
import { SnotifyService } from 'ng-snotify';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fieldsProperties } from 'src/app/visualizar-resultados/resultados/resultados.component';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { MatPaginator } from '@angular/material/paginator';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { LerDadosDoPdfService } from './ler-dados-do-pdf.service';
import { safeCall } from '@base-core/safe-call';

@Component({
  selector: 'app-ler-dados-do-pdf',
  templateUrl: './ler-dados-do-pdf.component.html',
  styleUrls: ['./ler-dados-do-pdf.component.scss']
})
export class LerDadosDoPdfComponent implements OnInit {

  isLoading = false;
  selectedFile: File;
  mTipoOperacao = "Parametros"
  public formulario: FormGroup;

  // do table
  @ViewChild(MatPaginator) paginatorPageSize: MatPaginator;
  tipoEvento: string = "Carregando dados...";
  filtrosGenericosLista: FiltrosGenericosModel[] = [];
  filterPaginator: FilterPaginator = {};
  pageLimitOptions: Array<number> = [2, 5, 10, 15, 20, 100];
  dataSourceWithPageSize = new MatTableDataSource<GovesaSaidasEntradasCab>([]);
  displayedColumns: string[] = ['secNome', 'secDtInicio', 'secDtFinal', 'secPgInicio', 'secPgFinal', 'secNomeArq' ]


  captionColumns: fieldsProperties[] = [
    { caption: 'Nome do Livro', weight: 8, mask: '', align: 'center', name: 'secNome' },
    { caption: 'Periodo de', weight: 6, mask: 'date', align: 'center', name: 'secDtInicio' },
    { caption: 'até', weight: 6, mask: 'date', align: 'center', name: 'secDtFinal' },
    { caption: 'Pagina Inicial', weight: 3, mask: '', align: 'center', name: 'secPgInicio' },
    { caption: 'Pagina Final', weight: 3, mask: '', align: 'center', name: 'secPgFinal' },
    { caption: 'Nome do Arquivo', weight: 15, mask: '', align: 'center', name: 'secNomeArq' }

  ]

  // termino do table 

  
  ListaGovesaSaidasEntradasCab: GovesaSaidasEntradasCab[] = [];
  constructor(
    private fb: FormBuilder,
    private session: SessionService
    , private router: Router
    , private snotifyService: SnotifyService
    , private lerDadosDoPdfService: LerDadosDoPdfService

  ) { }

  ngOnInit(): void {
    this.inicializarForm()

    this.filterPaginator.page = 0;
    this.filterPaginator.size = 10;
    this.filterPaginator.totalElements = 0;
    this.filterPaginator.totalPages = 0;

    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;

    this.fBuscarTabelaBase();
  }
  

  cancelarESair() {
    this.router.navigate(['/page/home']);

  }



  
  inicializarForm() {

    this.formulario = this.fb.group({
      secId: [null],
      secIdPessoa: [0],
      secNome: ['', [Validators.required, Validators.maxLength(100)]],
      secDtInicio: ['', [Validators.required]],
      secDtFinal: ['', [Validators.required]],
      secPgInicio: [0, [Validators.required]],      
      secPgFinal: [0, [Validators.required]],      
      secUrlImg: [''],      
      secNomeArq: ['', [Validators.required, Validators.maxLength(100)]]

    });

    

  }

  onFileSelected(event) {
         this.selectedFile = <File>event.target.files[0];

  }



  getAlingn(pNomeCampo) {

    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    //    let index: number = this.displayedColumns.indexOf(any);
    if (index > -1) {

      let mAlign: String = this.captionColumns[index].align;
      if (mAlign === "right") {
        return "text-align:right";
      } else if (mAlign === "center") {
        return "text-align:center";
      } else
        return "text-align:left";

    }
  }


  fValorENomeDoCampoParaformatar(pValor: GovesaSaidasEntradasCab, pNomeCampo: string) {



    let mValor: String = "";
    mValor = pValor[pNomeCampo];
    let mIndex = this.captionColumns.findIndex(x => x.name === pNomeCampo);
    if (mIndex > -1) {

      let mTipoCampo: String = this.captionColumns[mIndex].mask;


      return this.fRetornaFormatado(mValor, mTipoCampo.toString());
    }

  }

  fRetornaFormatado(pValor: any, pDataMask: string) {
    return new FormatarCamposDastabelas(pValor, pDataMask).formatar();
  }


  
  getStyle3(any) {
    let index: number = this.displayedColumns.indexOf(any);
    if (index < 0) {
      return 3
    } else {
      let mTamanho: number = this.captionColumns[index].weight;
      return ' ' + mTamanho + '% ';
    }
  }
  public getColumnName(pNomeCampo) {
    //    console.log('nome do campo 184 ', pNomeCampo)
    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    if (index < 0) {
      return pNomeCampo
    } else {
      let mCaption: String = this.captionColumns[index].caption;

      return mCaption;
    }
  }

  
  changeEvent() {
    this.filterPaginator.page = this.paginatorPageSize.pageIndex;
    this.filterPaginator.size = this.paginatorPageSize.pageSize;

    this.fBuscarTabelaBase();
  }

  
  fBuscarTabelaBase() {



    this.tipoEvento = "Carregando dados...";

    this.filtrosGenericosLista = [];



    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "secIdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "Resultados"

    parametrosDados.page = this.filterPaginator.page;
    parametrosDados.size = this.filterPaginator.size;






    // termino




    this.lerDadosDoPdfService.BuscarResultadosPage(parametrosDados)
      .subscribe((response) => {
        safeCall(response, () => {


          if (response.success) {
            this.dataSourceWithPageSize.data = [...response.objeto.content];
            this.filterPaginator.page = response.objeto.pageable.pageNumber;
            this.filterPaginator.size = response.objeto.pageable.pageSize;
            this.filterPaginator.totalElements = response.objeto.totalElements;
            this.filterPaginator.totalPages = response.objeto.totalPages;




          } else {
            this.snotifyService.error(response.error);
          }


          this.tipoEvento = "Aguardando....";



        })
      }, error => {

        this.snotifyService.error(error.error.message);
        this.tipoEvento = "Aguardando....";
      }
      )


  }

  // inicio





  enviar() {
    // Lógica para navegar para a pessoa anterior
    /*
    let mErros: string = "";

    if (this.formulario.valid == false) {
      this.formulario.hasError;
      this.formulario.setValidators;
      mErros = getFormValidationErrors(this.formulario) + "\n";
    }
    if (mErros.length > 1) {
      console.log('tamanho merror ', mErros.length, 'conteudo ', mErros)
      validarForm(this.formulario);
      this.snotifyService.error(mErros);

    } else {

      this.cadfilpadModel = [];

      let cadfilpadModel1: CadfilpadModel = {};
      cadfilpadModel1.fpcodusr = this.formulario.get("servidorWhatsAppCodUsr").value;
      cadfilpadModel1.fpvalor = this.formulario.get("servidorWhatsAppValor").value;
      cadfilpadModel1.fpcodusr = this.formulario.get("servidorWhatsAppCodUsr").value;
      cadfilpadModel1.fpcomp = this.formulario.get("servidorWhatsAppComp").value;
      cadfilpadModel1.fpid = this.formulario.get("servidorWhatsAppId").value;
      cadfilpadModel1.fpidPessoa = this.formulario.get("servidorWhatsAppIdPessoa").value;
      cadfilpadModel1.fpnome = this.formulario.get("servidorWhatsAppNome").value;
      this.cadfilpadModel.push(cadfilpadModel1);



      let cadfilpadModel2: CadfilpadModel = {};
      cadfilpadModel2.fpcodusr = this.formulario.get("numeroWhatsAppCodUsr").value;
      cadfilpadModel2.fpvalor = this.formulario.get("numeroWhatsAppValor").value;
      cadfilpadModel2.fpcodusr = this.formulario.get("numeroWhatsAppCodUsr").value;
      cadfilpadModel2.fpcomp = this.formulario.get("numeroWhatsAppComp").value;
      cadfilpadModel2.fpid = this.formulario.get("numeroWhatsAppId").value;
      cadfilpadModel2.fpidPessoa = this.formulario.get("numeroWhatsAppIdPessoa").value;
      cadfilpadModel2.fpnome = this.formulario.get("numeroWhatsAppNome").value;
      this.cadfilpadModel.push(cadfilpadModel2);



      try {

        this.showLoading();



        this.configuracoesService.CadfilpadSalvarAll(this.cadfilpadModel).subscribe((Response) => {
          safeCall(Response, () => {

            if (Response.success) {
              this.snotifyService.info("Salvo Com sucesso! Chave Id " + Response.idNumber);

              this.cancelarESair();

            }
          })
        }, error => {
          this.snotifyService.error(error.error.message);
        }



        );
      } catch (error) {
        this.snotifyService.error(error);

      } finally {
        this.hideLoading();

      }
    }
*/
  }



}
