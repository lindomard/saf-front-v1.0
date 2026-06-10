import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { cadreltabMapper } from '../mapper/cadrelpad-mapper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CadTableFilpadCamposModel } from 'src/app/genericos/model/CadTableFilpadCamposModel';
import { RetornoGenerico } from '../model/RetornoGenerico';

@Component({
  selector: 'app-config-pesquisar-por',
  templateUrl: './config-pesquisar-por.component.html',
  styleUrls: ['./config-pesquisar-por.component.scss']
})
export class ConfigPesquisarPorComponent implements OnInit {

  titulo = "Ordem dos Resultados";
  tipoEvento = "Ordem dos Resultados";

  mRetornoGenerico: RetornoGenerico = {};

  private cadreltabMapper = cadreltabMapper();

  constructor(
    public dialogRef: MatDialogRef<ConfigPesquisarPorComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: any
    , private changeDetectorRefs: ChangeDetectorRef

  ) { this.dialogRef.disableClose = true; }


  dataSourceTableFilpadPesquisarPor = new MatTableDataSource<CadTableFilpadCamposModel>([]);


  displayColumnsCamposIndices: string[] = ['selecionado', 'OrdemPesquisarPor', 'descricao'];





  ngOnInit(): void {
    this.dataSourceTableFilpadPesquisarPor.data = this.dados.dataSourceTableFilpadPesquisarPor;
    this.ordenar();


  }


  cancelarESair() {
    this.mRetornoGenerico.dados=this.dataSourceTableFilpadPesquisarPor.data;
    this.dialogRef.close(this.mRetornoGenerico);

  }



  reordenarItem() {
    this.mRetornoGenerico.alterou = true;
    let ordem: number = 0;
    this.dataSourceTableFilpadPesquisarPor.data.forEach(
      item => {
        if (item.selecionado == true) {
          ordem++;
          item.tfpcOrdemPesqpor = ordem;
        }
      }
    )


  }


  sortedPesquisarPor() {

    let cadTableFilpadCamposModelLista: CadTableFilpadCamposModel[] =
     this.cadreltabMapper.converterCadTableCamposModelToModel(this.dataSourceTableFilpadPesquisarPor.data);


     cadTableFilpadCamposModelLista = cadTableFilpadCamposModelLista.sort((a, b) =>
        (a.selecionado == true ? 0 : 1) - (b.selecionado == true ? 0 : 1) || a.tfpcOrdemPesqpor - b.tfpcOrdemPesqpor
        || String(a.tfpcDescricaoCustom).localeCompare(String(b.tfpcDescricaoCustom))
      );
      this.dataSourceTableFilpadPesquisarPor.data = cadTableFilpadCamposModelLista;


  
  }


  ordenar() {

    this.sortedPesquisarPor();


    this.reordenarItem();
    this.sortedPesquisarPor;

  }



  clickCamposDaTabelaOrdem(event, row) {


    row.selecionado = event.checked;


    row.tfpcOrdemPesqpor = event.checked == true ? 1 : 0;
  }




  clickCamposDaTabelaOrdemDesc(event, row) {


    row.tfpcOrdemPesqporDesc = event.checked == true ? 1 : 0;
    console.log('quem veio ', row.tfpcNomeCampo, ' selecionado ', row.selecionado)

    row.selecionado = row.tfpcOrdemPesqporDesc == true || row.tfpcOrdemPesqpor > 0;

  }

}


