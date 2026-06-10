import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { SessionService } from '@base-core/session/session.service';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { CadArqMagneticoModel } from '../model/CadArqMagneticoModel';
import { SelectionModel } from '@angular/cdk/collections';
import * as moment from 'moment';
import { ProcessarService } from '../processar.service';
import { safeCall } from '@base-core/safe-call';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { ParseFloat } from '@base-shared/funcoesGerais/function-form';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';

@Component({
  selector: 'app-selecionar-periodos',
  templateUrl: './selecionar-periodos.component.html',
  styleUrls: ['./selecionar-periodos.component.scss']
})
export class SelecionarPeriodosComponent implements OnInit {

  constructor(private processarService: ProcessarService
    , private session: SessionService
    , private snotifyService: SnotifyService
    , private router: Router
    , private fb: UntypedFormBuilder


  ) { }


  @Output() Acionarprocessar = new EventEmitter<any>();
    
  @Output() AcionarHistorico = new EventEmitter<any>();

//  @Output() AcionarProcessarArquivosGerados = new EventEmitter<any>();

  mTipoOperacao = "Gerar Arquivos Magneticos";
  mDisableGerar = false;

  dataSource = new MatTableDataSource<CadArqMagneticoModel>();
  selection = new SelectionModel<CadArqMagneticoModel>(true, []);
  public formulario: UntypedFormGroup;

  displayedColumns: string[] = [
    "select",
    "cnpj",
    "ie",
    "uf",
    "dtInicio",
    "dtFinal",
    "tipo"
  ];


  ngOnInit(): void {
    this.inicializarForm();
    this.fBuscarCadArqMagneticos();

    this.AcionarHistorico.emit();

  }

  GerarEfdIcms() {
    this.mDisableGerar = true;
    let filtrosGenericosLista: FiltrosGenericosModel[] = [];
    filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "versao", "=", this.formulario.get("versaoEfdIcms").value,0,"").adicionarfiltros();

    filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "idPessoa", "=", this.session.companyId,0,"").adicionarfiltros();

    filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "DeletarAnteriores", "=", this.formulario.get("mSubstituirAnteriores").value==true ? "1" : "0",0,"").adicionarfiltros();

    
    if (this.isAllSelected()) {
      filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "dtInicio", "=", "Todos",0,"").adicionarfiltros();
    } else {
      this.selection.selected.forEach(s => {
        filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "dtInicio", "=",
          moment(s.dtInicio).format('YYYYMM'),0,"").adicionarfiltros();

      })
    };

    let parametrosDados: ParametrosDados = {} ;
    parametrosDados.filtrosGenericosList  = filtrosGenericosLista;

    this.processarService.gerarArqMagneticos("gerarEfdIcms",parametrosDados).subscribe((RespostaComMensagemModel) => {
      safeCall(RespostaComMensagemModel, () => {
        this.Acionarprocessar.emit();


        this.mDisableGerar = false;
      })

    }, error => {
      this.snotifyService.error(error.error.message);
      this.mDisableGerar = false;
    }
    )



  }

// gerar sintegra


GerarSintegra() {
  this.mDisableGerar = true;
  let filtrosGenericosLista: FiltrosGenericosModel[] = [];                                                              
  filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "versao", "=", this.formulario.get("versaoSintegra").value,0,"").adicionarfiltros();

  filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "idPessoa", "=", this.session.companyId,0,"").adicionarfiltros();

  filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "DeletarAnteriores", "=", this.formulario.get("mSubstituirAnteriores").value==true ? "1" : "0",0,"").adicionarfiltros();

  
  if (this.isAllSelected()) {
    filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "dtInicio", "=", "Todos",0,"").adicionarfiltros();
  } else {
    this.selection.selected.forEach(s => {
      filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "dtInicio", "=",
        moment(s.dtInicio).format('YYYYMM'),0,"").adicionarfiltros();

    })
  };

  let parametrosDados: ParametrosDados = {} ;
  parametrosDados.filtrosGenericosList  = filtrosGenericosLista;

  this.processarService.gerarArqMagneticos("gerarEfdIcms",parametrosDados).subscribe((RespostaComMensagemModel) => {
    safeCall(RespostaComMensagemModel, () => {
      this.Acionarprocessar.emit();


      this.mDisableGerar = false;
    })

  }, error => {
    this.snotifyService.error(error.error.message);
    this.mDisableGerar = false;
  }
  )



}

// gerar sintegra termino
  cancelarESair() {
    this.router.navigate(['/page/home']);

  }



  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    // if there is a selection then clear that selection
    if (this.isSomeSelected()) {
      this.selection.clear();
    } else {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  isSomeSelected() {
    return this.selection.selected.length > 0;
  }

  fBuscarCadArqMagneticos() {


    this.processarService.BuscarArqMagneticos(this.session.companyId).subscribe((CadArqMagneticoModel) => {
      safeCall(CadArqMagneticoModel, () => {

        this.dataSource.data = [...CadArqMagneticoModel]
      })
    }, error => {
      this.snotifyService.error(error.error.message);
    }
    )


  }


  fRetornaFormatado(pValor: any, pDataMask: string) {

    try {


      if (pValor == null || pDataMask == null) {
        return pValor;
      }


      let mValor: string = pDataMask.toLowerCase();
      switch (mValor) {
        case 'valorboolean':
          return pValor == 1 ? "SIM" : "NAO";

        case 'datetime':
          return moment(pValor).format('DD/MM/YYYY HH:mm:ss');
        case 'date':
          return moment(pValor).format('DD/MM/YYYY');
        case 'cnpj':
          return FuncoesGerais.fMascaracpfCnpj(pValor);
        case 'valor2dec':
          return ParseFloat(FuncoesGerais.toDouble(pValor), 2);
        case 'valor3dec':
          return ParseFloat(FuncoesGerais.toDouble(pValor), 3);
        case 'valor4dec':
          return ParseFloat(FuncoesGerais.toDouble(pValor), 4);

        default:


          return pValor;
      }


    } catch (error) {

      return pValor;
    }
  }


  inicializarForm() {

    this.formulario = this.fb.group({
      versaoEfdIcms: ['000', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      versaoContribuicoes: ['000', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      versaoSintegra: ['000', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      mSubstituirAnteriores: [false, [Validators.required]]


    });

  }


}
