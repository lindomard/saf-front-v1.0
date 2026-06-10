import { ChangeDetectorRef, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CadTableFilpadCamposModel } from 'src/app/genericos/model/CadTableFilpadCamposModel';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cadreltabMapper } from '../mapper/cadrelpad-mapper';
import { RetornoGenerico } from '../model/RetornoGenerico';

@Component({
  selector: 'app-config-ordem-rel-result-modal',
  templateUrl: './config-ordem-rel-result-modal.component.html',
  styleUrls: ['./config-ordem-rel-result-modal.component.scss']
})
export class ConfigOrdemResultModalComponent implements OnInit {

  titulo = "Ordem dos Resultados";
  tipoEvento = "Ordem dos Resultados";
  mRetornoGenerico: RetornoGenerico = {};
  private cadreltabMapper = cadreltabMapper();

  constructor(
    public dialogRef: MatDialogRef<ConfigOrdemResultModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: any
    , private changeDetectorRefs: ChangeDetectorRef

  ) { this.dialogRef.disableClose = true; }

  // @Input() tableCamposFiltros = [];

  //dataSourceTableFilpadOrdemResult.data: CadTableFilpadCamposModel[]=[];

  dataSourceTableFilpadOrdemResult = new MatTableDataSource<CadTableFilpadCamposModel>([]);


  displayColumnsCamposIndices: string[] = ['selecionado', 'OrdemResult', 'descricao', 'decrescente'];


//  @ViewChild('tableCamposFiltros', { static: true }) tableCamposFiltros2: MatTable<CadTableFilpadCamposModel>;



  ngOnInit(): void {
    this.dataSourceTableFilpadOrdemResult.data = this.dados.dataSourceTableFilpadOrdemResult;
    this.ordenar();


  }


  cancelarESair() {
    this.dataSourceTableFilpadOrdemResult.data.forEach(ordem => {
      if (ordem.selecionado == true) {
        console.log('nome ', ordem.tfpcDescricaoCustom, ' ordem result ', ordem.tfpcOrdemRelResult, ' desc '
          , ordem.tfpcOrdemRelResultDesc, ' selecionado ', ordem.selecionado)
      }
    })
    this.mRetornoGenerico.dados = this.dataSourceTableFilpadOrdemResult.data;
    
    this.dialogRef.close(this.mRetornoGenerico.dados);

  }

  dropTableIndicesCampos(event: CdkDragDrop<CadTableFilpadCamposModel[]>) {
    const prevIndex = this.dataSourceTableFilpadOrdemResult.data.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSourceTableFilpadOrdemResult.data, prevIndex, event.currentIndex);

//    this.tableCamposFiltros2.renderRows();
    this.reordenarItem();

  }

  reordenarItem() {
    this.mRetornoGenerico.alterou = true;
    let ordem: number = 0;
    this.dataSourceTableFilpadOrdemResult.data.forEach(
      item => {
        if (item.selecionado == true) {
          ordem++;
          item.tfpcOrdemRelResult = ordem;
        }
      }
    )


  }


  sortedOrdemResult() {

    let cadTableFilpadCamposModelLista: CadTableFilpadCamposModel[] =
     this.cadreltabMapper.converterCadTableCamposModelToModel(this.dataSourceTableFilpadOrdemResult.data);


     cadTableFilpadCamposModelLista = cadTableFilpadCamposModelLista.sort((a, b) =>
        (a.selecionado == true ? 0 : 1) - (b.selecionado == true ? 0 : 1) || a.tfpcOrdemRelResult - b.tfpcOrdemRelResult
        || String(a.tfpcDescricaoCustom).localeCompare(String(b.tfpcDescricaoCustom))
      );
      this.dataSourceTableFilpadOrdemResult.data = cadTableFilpadCamposModelLista;


  
  }


  ordenar() {

    this.sortedOrdemResult();


    this.reordenarItem();
    this.sortedOrdemResult;

  }



  clickCamposDaTabelaOrdem(event, row) {
    row.selecionado = event.checked;
    row.tfpcOrdemRelResult = event.checked == true ? 1 : 0;
    this.mRetornoGenerico.alterou = true;
  }





  clickCamposDaTabelaOrdemDesc(event, row) {


    row.tfpcOrdemRelResultDesc = event.checked == true ? 1 : 0;
//    console.log('quem veio ', row.tfpcNomeCampo, ' selecionado ', row.selecionado)

    row.selecionado = row.tfpcOrdemRelResultDesc == true || row.tfpcOrdemRelResult > 0;


  }

}


