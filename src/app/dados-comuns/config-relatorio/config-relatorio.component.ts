import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FieldsFilter } from '../model/FieldsFilter';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';
import { TableListComponent } from '@base-shared/table-list/table-list.component';
import { CadTableFilpadCamposModel } from 'src/app/genericos/model/CadTableFilpadCamposModel';
import { MatDialog } from '@angular/material/dialog';
import { CadTableFilpadCabModel } from 'src/app/genericos/model/CadTableFilpadCabModel';
import { CadrelpadCamposModel } from 'src/app/genericos/model/CadrelpadCamposModel';
import { cadreltabMapper } from '../mapper/cadrelpad-mapper';
import { ConfigOrdemResultModalComponent } from '../config-ordem-rel-result-modal/config-ordem-rel-result-modalcomponent';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { DadosComunsService } from '../dados-comuns.service';
import { safeCall, safeCallOrNull } from '@base-core/safe-call';
import { SaltarRelatorioPadraoModalComponent } from '../salvar-relatorio-padrao/saltar-relatorio-padrao-modal/saltar-relatorio-padrao-modal.component';
import { SessionService } from '@base-core/session/session.service';
import { DadosParaComboboxModel } from '@base-core/model/dados-para-combobox-model';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';

@Component({
  selector: 'app-config-relatorio',
  templateUrl: './config-relatorio.component.html',
  styleUrls: ['./config-relatorio.component.scss']
})
export class ConfigRelatorioComponent implements OnInit, OnChanges {

  private cadrelpadMapper = cadreltabMapper();
  isLoading = false;
  mSalvando: boolean = false;
  isChecked: boolean = false;
  @Input() relatorioSelecionado: DadosParaComboboxModel = {};
  @Output() resetarConfiguracoesEmit: EventEmitter<any> = new EventEmitter<any>();

  
  constructor(
    public dialog: MatDialog

    , private snotifyService: SnotifyService
    , private dadosComunsService: DadosComunsService
    , private session: SessionService

  ) { }


  
  @Input() dataSourceTableFilpadCab: CadTableFilpadCabModel;
  //  dataSourceTableFilpadCab: CadTableFilpadCabModel = {};

  //  @Input() dataSourceFilpadRelCampos = new MatTableDataSource<CadTableFilpadCamposModel>([]);
  //  @Input() dataSourceFilpadRelOrdemResult = new MatTableDataSource<CadTableFilpadCamposModel>([]);

  //  @Input() tableCamposFiltros = [];



  @Output() fAtualizarDadosTabela: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('tableCamposFiltros', { static: true }) tableCamposFiltros2: MatTable<CadTableFilpadCamposModel>;

  displayColumnsCamposIndices: string[] = ['selecionado', 'position', 'descricao', 'Tamanho', 'Alinhar'];
  selection = new SelectionModel<FieldsFilter>(true, []);

  aliqgn = [{
    name: "Centro",
    id: "C"
  },
  {
    name: "Direito",
    id: "D"
  },
  {
    name: "Esquerdo",
    id: "E"
  }];


  selected: any = "C";
  ngOnInit(): void {
    //    this.masterToggle();
    this.selection.toggle


  }
  ordenar() {

    this.mSalvando = true;
    let cadTableFilpadCabModelList: CadTableFilpadCamposModel[] = this.cadrelpadMapper
      .converterCadTableCamposModelToModel(this.dataSourceTableFilpadCab.cadTableFilpadCampos);

    cadTableFilpadCabModelList.forEach(campos => {
      campos.selecionado = campos.tfpcOrdemRelResult > 0;

    })

    cadTableFilpadCabModelList = cadTableFilpadCabModelList.sort((a, b) =>
      (a.selecionado == true ? 0 : 1) - (b.selecionado == true ? 0 : 1) || a.tfpcOrdemRelResult - b.tfpcOrdemRelResult
      || String(a.tfpcDescricaoCustom).localeCompare(String(b.tfpcDescricaoCustom))
    );


    console.log('campos ordem qtd ', this.dataSourceTableFilpadCab.cadTableFilpadCampos.length, ' dados JSON ',
      JSON.stringify(this.dataSourceTableFilpadCab.cadTableFilpadCampos[0]));
    const dialogRef = this.dialog.open(ConfigOrdemResultModalComponent, {

      panelClass: 'app-no-padding-dialog',
      width: '80%',

      data: {
        dataSourceTableFilpadOrdemResult: cadTableFilpadCabModelList
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      result.forEach(chegou => {
        console.log('chegou ', chegou.tfpcNomeCampo)
      })
      this.dataSourceTableFilpadCab.cadTableFilpadCampos = result;
      this.sortCamposLista();

      this.fAtualizarDadosTabela.emit();
    });

    this.mSalvando = false;

  }
  selecionado(event, row) {
    event ? this.selection.toggle(row) : null
    this.fAtualizarDadosTabela.emit();
  }

  refresh() {
    this.tableCamposFiltros2.renderRows();
    this.fAtualizarDadosTabela.emit();

  }


  marcar() {
    //    if (this.isAllSelected()) {
    //      this.masterToggle();
    this.dataSourceTableFilpadCab.cadTableFilpadCampos.forEach(row => {
      row.selecionado = true;

    });

    this.tableCamposFiltros2.renderRows();


    //  }
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceTableFilpadCab.cadTableFilpadCampos.length;
    return numSelected === numRows;

  }
  masterToggle() {
    let mSelected = this.isAllSelected();
    mSelected ?
      this.selection.clear() :

      this.dataSourceTableFilpadCab.cadTableFilpadCampos.forEach(row => this.selection.select(row));

    mSelected ?
      this.dataSourceTableFilpadCab.cadTableFilpadCampos.forEach(row => {
        row.selecionado = false;
      }
      )
      :
      this.dataSourceTableFilpadCab.cadTableFilpadCampos.forEach(row => {
        row.selecionado = true;

      });
    this.fAtualizarDadosTabela.emit();
  }


  dropTableIndicesCampos(event: CdkDragDrop<CadTableFilpadCamposModel[]>) {
    const prevIndex = this.dataSourceTableFilpadCab.cadTableFilpadCampos.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSourceTableFilpadCab.cadTableFilpadCampos, prevIndex, event.currentIndex);
    this.tableCamposFiltros2.renderRows();
    this.fAtualizarDadosTabela.emit();

  }

  clickCamposDaTabela() {
    this.fAtualizarDadosTabela.emit();
  }



  valueChange(event) {
    console.log("selected value", event.target.value,
      'value of selected', this.selected);
    //this.selected = event.target.value;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSourceTableFilpadCab'] && this.dataSourceTableFilpadCab.cadTableFilpadCampos) {

      this.sortCamposLista();


    }
  }

  sortCamposLista() {


    let cadTableFilpadCamposModelLista: CadTableFilpadCamposModel[] = this.dataSourceTableFilpadCab.cadTableFilpadCampos

    cadTableFilpadCamposModelLista.forEach(campos => {
      campos.selecionado = campos.tfpcOrdemRel > 0;
    }
    )

    cadTableFilpadCamposModelLista = cadTableFilpadCamposModelLista.sort((a, b) =>
      (a.selecionado == true ? 0 : 1) - (b.selecionado == true ? 0 : 1) || a.tfpcOrdemLista - b.tfpcOrdemLista
      || String(a.tfpcDescricaoCustom).localeCompare(String(b.tfpcDescricaoCustom))
    );
    this.dataSourceTableFilpadCab.cadTableFilpadCampos = cadTableFilpadCamposModelLista;

  }



  salvarRelatorioPadrao() {
    try {

      this.showLoading();
      this.mSalvando = true;

      this.dataSourceTableFilpadCab.tfpcNome = "_";


      this.dadosComunsService.CadtableFilpadSalvar(this.dataSourceTableFilpadCab).subscribe((Response) => {
        safeCall(Response, () => {

          if (Response.success) {
            this.snotifyService.info("Salvo Com sucesso! Chave Id " + Response.idNumber);
          }
        })
      }, error => {
        this.snotifyService.error(error.error.message);
      }



      );
    } catch (error) {
      this.snotifyService.error(error);

    } finally {
      this.mSalvando = false;
      this.hideLoading();

    }
  }


  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }



  fSalvarRelatorioComoDialog() {

    const dialogRef = this.dialog.open(SaltarRelatorioPadraoModalComponent, {

      panelClass: 'app-no-padding-dialog',
      width: '80%',
      data: {
        idPessoa: this.session.companyId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      safeCallOrNull(result, (res) => {
        if (res.length > 3) {
          this.fSalvarRelatorioComo(res);
        } else {
          this.snotifyService.warning('Nome do relatorio ' + res + " é invalido!");
        }


      },
        () => { });
    });



  }

  fSalvarRelatorioComo(pNomeRel: string) {

    try {

      this.showLoading();
      this.mSalvando = true;


  



      this.dataSourceTableFilpadCab.tfpcNome=pNomeRel;
      this.dataSourceTableFilpadCab.tfpcRelPaisagem = this.isChecked == true ? 1 : 0;



      this.dadosComunsService.CadRelPadOrigemCadtableFilpadSalvar(this.dataSourceTableFilpadCab).subscribe((Response) => {
        safeCall(Response, () => {

          if (Response.success) {
            this.resetarConfiguracoes();
            this.snotifyService.info("Salvo Com sucesso! Chave Id " + Response.idNumber);
          }
        })
      }, error => {
        this.snotifyService.error(error.error.message);
      }



      );
    } catch (error) {
      this.snotifyService.error(error);

    } finally {
      this.mSalvando = false;
      this.hideLoading();

    }
  }


  excluirRelatorio() {
    if (this.relatorioSelecionado.id > 0) {

      let mensagem = "Quer realmente excluir o relatorio: " + this.relatorioSelecionado.name;
      this.snotifyService.confirm(mensagem, 'Confirmação', {
        timeout: 5000,
        position: SnotifyPosition.centerCenter,
        showProgressBar: true,
        closeOnClick: true,

        pauseOnHover: true,
        buttons: [
          {
            text: 'Sim', action: () => {
              this.fExcluirRelatorio()
            }
          },
          { text: 'Não', action: () => console.log('Clicked: No') },
        ]
      });
    }


  }



  fExcluirRelatorio() {

    try {

      this.showLoading();
      this.mSalvando = true;




      this.dadosComunsService.CadRelpadDeletar(this.relatorioSelecionado.id).subscribe((Response) => {
        safeCall(Response, () => {

          if (Response.success) {
            this.resetarConfiguracoes();
            this.snotifyService.info("Registro Excluido Com sucesso!");
          }
        })
      }, error => {
        this.snotifyService.error(error.error.message);
      }



      );
    } catch (error) {
      this.snotifyService.error(error);

    } finally {
      this.mSalvando = false;
      this.hideLoading();

    }


  }

  resetarConfiguracoes() {
    this.resetarConfiguracoesEmit.emit("");
   }

}