import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CamposParaFiltros } from '../model/CamposParaFiltros';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CamposParaOrdem } from '../model/CamposParaOrdem';

@Component({
  selector: 'app-ordem-campos',
  templateUrl: './ordem-campos.component.html',
  styleUrls: ['./ordem-campos.component.scss']
})
export class OrdemCamposComponent implements OnInit {

  constructor() { }
  @ViewChild('tableCamposFiltros', { static: true }) tableCamposFiltros2: MatTable<CamposParaFiltros>;

  @Input() tableCamposFiltros = [];

  @Input() dataSourceOrdem = new MatTableDataSource<CamposParaOrdem>();
  @Output() fAtualizarDadosTabela: EventEmitter<any> = new EventEmitter<any>();

  displayColumnsCamposIndices: string[] = ['existe', 'position', 'descricao','decrescente'];
    
  ngOnInit(): void {
  }


  refresh() {
    this.tableCamposFiltros2.renderRows();
    this.fAtualizarDadosTabela.emit();

  }
  dropTableIndicesCampos(event: CdkDragDrop<CamposParaFiltros[]>) {
    const prevIndex = this.dataSourceOrdem.data.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSourceOrdem.data, prevIndex, event.currentIndex);
    this.tableCamposFiltros2.renderRows();
    this.fAtualizarDadosTabela.emit();

  }

  clickCamposDaTabela() {
    this.fAtualizarDadosTabela.emit();    
  }
  

}
