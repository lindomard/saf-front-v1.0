import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { SnotifyService } from 'ng-snotify';
import { CadConclusaoModel } from '../model/CadConclusaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { fieldsProperties } from 'src/app/visualizar-resultados/resultados/resultados.component';
import { CadsitdocResumidoModel } from '@home/model/CadsitdocResumidoModel';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { SessionService } from '@base-core/session/session.service';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { HomePageService } from '@home/component/home-page/home-page.service';
import { safeCall } from '@base-core/safe-call';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';

@Component({
  selector: 'app-retaguarda-visualizar-resultados',
  templateUrl: './retaguarda-visualizar-resultados.component.html',
  styleUrls: ['./retaguarda-visualizar-resultados.component.scss']
})
export class RetaguardaVisualizarResultadosComponent implements OnInit {

    

  constructor(private snotifyService: SnotifyService
    , private router: Router
    , private session: SessionService
    , private homePageService: HomePageService
        
  ) { }

  dataSourceWithPageSizeSit = new MatTableDataSource<CadsitdocResumidoModel>([]);  
  mEstaProcessando: boolean = false;
  mProcessando: boolean = false;

  mDisableButons: boolean = false;

  mGerarPlanilha: boolean = false;

  mArquivosOk: boolean = false;
  mArquivosOkSemInvFinal: boolean = false;

  ngOnInit(): void {
    this.buscarCadSitdocResumido();
  }


  validarPlanilha() {
    this.mGerarPlanilha = this.mGerarPlanilha == false;
  }


  emProducao() {
    this.snotifyService.info("Em Produção")
  }

  baixarDocumento(pNomeRel: string, pUrl: string) {

  }


  cadConclusao() {
    this.router.navigate(['/page/cadConclusao']);
  }

  analiseEstrutural() {
    this.router.navigate(['/page/analiseEstrutural']);
  }


  cancelarESair() {
      this.router.navigate(['/page/home']);

  }

  // inicio

    buscarCadSitdocResumido() {
  
      // inicio
      this.mArquivosOk = false;
      this.mArquivosOkSemInvFinal = false;
  
  
      let filtrosGenericosLista: FiltrosGenericosModel[] = [];
  
      filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "cdrIdPessoa", "=",
        this.session.companyId.toString(), 0, " and ").adicionarfiltros();
  
  
  
  
      // inicio
      let parametrosDadosSit: ParametrosDados = {};
      parametrosDadosSit.filtrosGenericosList = filtrosGenericosLista;
  
      parametrosDadosSit.size = 5;
      parametrosDadosSit.page = 0;
      this.homePageService.cadSitdocResumidoGetList(parametrosDadosSit).subscribe((Response) => {
  
  
        safeCall(Response.objeto, (cadsitdocResumidoModel) => {
  
          this.dataSourceWithPageSizeSit.data = [...cadsitdocResumidoModel.content];
  
          this.fAtualizarArquivosOk();
  
  
        })
  
      }, error => {
        this.snotifyService.error(HttpMensage(error));
      }
      )
  
      // termino
  
    }

  fAtualizarArquivosOk() {
    this.mArquivosOk = true;
    this.mArquivosOkSemInvFinal = true;


    this.dataSourceWithPageSizeSit.data.forEach(sitdoc => {

      this.mArquivosOk = sitdoc.sdrQtdErros <= 0;

      this.mArquivosOkSemInvFinal = (sitdoc.sdrQtdErros - sitdoc.sdrQtdInvfinFalta) <= 0;
      console.log('qtd erros ',sitdoc.sdrQtdErros , ' qtd falta inv ', sitdoc.sdrQtdInvfinFalta);
      console.log('arquivo final ', this.mArquivosOkSemInvFinal);
      console.log('arquivo ok ', this.mArquivosOk);
      

      return;

    })


  }
    

}
