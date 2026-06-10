import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CadTableFilpadCamposModel } from 'src/app/genericos/model/CadTableFilpadCamposModel';
import { FieldsFilter } from '../model/FieldsFilter';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CadTableFilpadCabModel } from 'src/app/genericos/model/CadTableFilpadCabModel';
import { cadreltabMapper } from '../mapper/cadrelpad-mapper';
import { ConfigPesquisarPorComponent } from '../config-pesquisar-por/config-pesquisar-por.component';
import { PesquisarPorComponent } from '../pesquisar-por/pesquisar-por.component';
import { ConfigOrdemResultModalComponent } from '../config-ordem-rel-result-modal/config-ordem-rel-result-modalcomponent';

@Component({
  selector: 'app-config-table',
  templateUrl: './config-table.component.html',
  styleUrls: ['./config-table.component.scss']
})
export class ConfigTableComponent implements OnInit, OnChanges {


  obsPerc: string = "Observações dos Percentuais";
  mAlterouDados: boolean = false;

  constructor(
    public dialog: MatDialog
    //,private cd: ChangeDetectorRef

  ) { }


//    @ViewChild('instancePesquisarPorComponent', { static: true }) instancePesquisarPorComponent: PesquisarPorComponent;

  

  //  @Input() dataSourceTableFilpadCampos = new MatTableDataSource<CadTableFilpadCamposModel>([]);

  @Input() dataSourceTableFilpadCab_par: CadTableFilpadCabModel;

  dataSourceTableFilpadCab: CadTableFilpadCabModel = {};
  private cadreltabMapper = cadreltabMapper();

  /*  @Input() dataSourceTableFilpadCampos = new MatTableDataSource<CadTableFilpadCamposModel>([]);
  
  
    @Input() dataSourceTableFilpadOrdemResult = new MatTableDataSource<CadTableFilpadCamposModel>([]);
    */

  //  @Input() tableCamposFiltros = [];

  @Output() fAjustarDisplayColumnsTable: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('tableCamposFiltros', { static: true }) tableCamposFiltros2: MatTable<CadTableFilpadCamposModel>;

  displayColumnsCamposIndices: string[] = ['selecionado', 'OrdemLista', 'descricao', 'Tamanho', 'Alinhar'];
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
    this.fAjustarSelecionados();
    // this.masterToggle();
    //        this.selection.toggle


  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSourceTableFilpadCab_par'] && this.dataSourceTableFilpadCab_par.cadTableFilpadCampos ) {
      this.dataSourceTableFilpadCab = this.dataSourceTableFilpadCab_par;

      this.sortCamposLista();

      
/*      
      this.dataSourceTableFilpadCab_par.cadTableFilpadCampos = this.dataSourceTableFilpadCab_par.cadTableFilpadCampos.sort((a, b) =>
      (a.selecionado == true ? 0 : 1) - (b.selecionado == true ? 0 : 1) || a.tfpcOrdemResCons - b.tfpcOrdemResCons
      || String(a.tfpcDescricaoCustom).localeCompare(String(b.tfpcDescricaoCustom))
      
    );
*/

    console.log('passou no sort')


    }
  }



  fAjustarSelecionados() {
    this.dataSourceTableFilpadCab.cadTableFilpadCampos.forEach(row => { row.selecionado = row.tfpcOrdemLista > 0 });
    this.organizarCamposLista(false);


  }


  fAjustarSelecionadosResult() {
    this.dataSourceTableFilpadCab.cadTableFilpadCampos.forEach(row => { row.selecionado = row.tfpcOrdemResCons > 0 });
    this.sortCamposLista();
/*
    this.dataSourceTableFilpadCab.cadTableFilpadCampos = this.dataSourceTableFilpadCab.cadTableFilpadCampos.sort((a, b) =>
      (a.selecionado == true ? 1 : 0) - (b.selecionado == true ? 1 : 0) || a.tfpcOrdemLista - b.tfpcOrdemLista
      || String(a.tfpcDescricaoCustom).localeCompare(String(b.tfpcDescricaoCustom))
    );
*/


  }

// inicio 


fAjustarSelecionadosPesquisarPor() {
  this.dataSourceTableFilpadCab.cadTableFilpadCampos.forEach(row => { row.selecionado = row.tfpcOrdemPesqpor > 0 });
  this.sortCamposLista();
/*
  this.dataSourceTableFilpadCab.cadTableFilpadCampos = this.dataSourceTableFilpadCab.cadTableFilpadCampos.sort((a, b) =>
    (a.selecionado == true ? 1 : 0) - (b.selecionado == true ? 1 : 0) || a.tfpcOrdemLista - b.tfpcOrdemLista
    || String(a.tfpcDescricaoCustom).localeCompare(String(b.tfpcDescricaoCustom))
  );
*/


}

// termino


  ConfigOrdemResult() {

    this.fAjustarSelecionadosResult();




    const dialogRef = this.dialog.open(ConfigOrdemResultModalComponent, {

      panelClass: 'app-no-padding-dialog',
      width: '80%',

      data: {
        dataSourceTableFilpadOrdemResult: this.dataSourceTableFilpadCab.cadTableFilpadCampos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSourceTableFilpadCab.cadTableFilpadCampos = result.dados;
      this.mAlterouDados = result.alterou == true;
      this.fAjustarSelecionados();
      result.forEach(saida => {
        if (saida.selecionado == true) {
        }
      })
      this.fAjustarDisplayColumnsTable.emit(this.mAlterouDados == true ? "table" : "");

    });


    //


  }

// inicio 

ConfigPesquisarPor() {

  this.fAjustarSelecionadosPesquisarPor();




  const dialogRef = this.dialog.open(ConfigPesquisarPorComponent, {

    panelClass: 'app-no-padding-dialog',
    width: '40%',

    data: {
      dataSourceTableFilpadPesquisarPor: this.dataSourceTableFilpadCab.cadTableFilpadCampos
    }
  });

  dialogRef.afterClosed().subscribe(result => {




    result.dados.forEach(ret=> {
      if (ret.selecionado == true) {
        console.log('retorno dialog ', ret.tfpcNomeCampo)
      }

    })

    this.dataSourceTableFilpadCab.cadTableFilpadCampos = result.dados;
    this.fAjustarSelecionados();
//    this.instancePesquisarPorComponent.refreshTela();

    this.fAjustarDisplayColumnsTable.emit(result.alterou==true ? "table" : "");
  });


  //


}


// termino


  sortCamposLista() {

    let cadTableFilpadCamposModelLista: CadTableFilpadCamposModel[] =
     this.cadreltabMapper.converterCadTableCamposModelToModel(this.dataSourceTableFilpadCab.cadTableFilpadCampos);



     cadTableFilpadCamposModelLista = cadTableFilpadCamposModelLista.sort((a, b) =>
      (a.selecionado == true ? 0 : 1) - (b.selecionado == true ? 0 : 1) || a.tfpcOrdemLista - b.tfpcOrdemLista
      || String(a.tfpcDescricaoCustom).localeCompare(String(b.tfpcDescricaoCustom))
    );
    this.dataSourceTableFilpadCab.cadTableFilpadCampos = cadTableFilpadCamposModelLista;
    this.fCalcularTotaisPercentuais();

  }


  enumerarOrdem() {

    console.log("entrou no enumeroar ordem")

    let mOrdem: number = 0;
    this.dataSourceTableFilpadCab.cadTableFilpadCampos.forEach(ordem => {
      if (ordem.selecionado == false) {
        ordem.tfpcOrdemLista = 0;
      }
      if (ordem.tfpcOrdemLista > 0) {
        mOrdem++;
        ordem.tfpcOrdemLista = mOrdem;
        console.log('ordem ', mOrdem, '/', ordem.tfpcOrdemLista, ' nome ', ordem.tfpcDescricaoCustom, ' selecionado ', ordem.selecionado);
      }

    }

    );
    this.sortCamposLista();
  }


  selecionado(event, row) {
    event ? this.selection.toggle(row) : null
    //    this.dataSourceTableFilpadCampos.data[row].selecionado =  event.checked;
    row.selecionado = event.checked;
    row.tfpcOrdemLista = (row.selecionado == false ? 0 : (row.tfpcOrdemLista > 0 ? row.tfpcOrdemLista : 1));
    //  console.log('quem veio ', row.tfpcNomeCampo, ' selecionado ',row.selecionado)

    //    this.clickando(row)
    //    enumerarOrdem
    //this.fAjustarDisplayColumnsTable.emit("");
    this.fCalcularTotaisPercentuais();
  }

  refresh() {
    this.tableCamposFiltros2.renderRows();
    this.fAjustarDisplayColumnsTable.emit(this.mAlterouDados == true ? "table" : "");

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

    console.log('marcando tudo 119')
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
    this.fAjustarDisplayColumnsTable.emit(this.mAlterouDados == true ? "table" : "");
//    this.fAjustarDisplayColumnsTable.emit(this.mAlterouDados == true ? "table" : "");


  }

  /*
    dropTableIndicesCampos(event: CdkDragDrop<CadTableFilpadCamposModel[]>) {
      const prevIndex = this.dataSourceTableFilpadCampos.data.findIndex((d) => d === event.item.data);
      moveItemInArray(this.dataSourceTableFilpadCampos.data, prevIndex, event.currentIndex);
      this.tableCamposFiltros2.renderRows();
      this.clickando(this.dataSourceTableFilpadCampos.data[prevIndex]);
      //    this.fAjustarDisplayColumnsTable.emit("");
  
    }
  */
  clickCamposDaTabela() {
    this.fAjustarDisplayColumnsTable.emit(this.mAlterouDados == true ? "table" : "");
  }



  valueChange(event) {
    //  console.log("selected value", event.target.value,
    //'value of selected', this.selected);
    //this.selected = event.target.value;
  }

  clickando(row) {
    this.mAlterouDados = true;
    this.fCalcularTotaisPercentuais();    
    //    this.enumerarOrdem();

    //  this.fAjustarDisplayColumnsTable.emit("");
    //    console.log('emitindo evento config-table')
    //console.log('clici ', JSON.stringify(row), ' dathora ', new Date());
  }

  organizarCamposLista(pAtualiza: boolean) {
    this.sortCamposLista();

    if (pAtualiza == true) {
      this.enumerarOrdem();
      this.fAjustarDisplayColumnsTable.emit(this.mAlterouDados == true ? "table" : "");

    }

  }

  

  fCalcularTotaisPercentuais() {

    let mPercRel: number = 0;
//    console.log('esta no percentuais ', new Date())
    this.dataSourceTableFilpadCab.cadTableFilpadCampos.forEach( campos=> {

      mPercRel += campos.selecionado==true ? campos.tfpcTamanhoPerc : 0.0;
//      console.log('acumulando percentuais  ', mPercRel.toFixed(2), 'Data hora' , new Date());
      

    });
    this.obsPerc = "Percentual ja Definido " + mPercRel.toFixed(2) +" Restante " + (100 - mPercRel).toFixed(2);


    this.fAjustarDisplayColumnsTable.emit(this.mAlterouDados == true ? "table" : "");


  }


}
