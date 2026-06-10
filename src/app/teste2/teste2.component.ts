import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ArquivosService } from '@base-core/service/arquivos.service';
import { DocData } from './model/FormData';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RegistroModel } from './model/RegistroModel';
import { fieldsProperties } from '../visualizar-resultados/resultados/resultados.component';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { FilterPaginator } from '@base-core/state/filter-paginator';

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  fav: string;
}


@Component({
  selector: 'app-teste2',
  templateUrl: './teste2.component.html',
  styleUrls: ['./teste2.component.scss']
})




export class Teste2Component implements OnInit {

  myFiles: string[] = [];
  sMsg: string = '';


//  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
//  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  dataSourceWithPageSize = new MatTableDataSource<PeriodicElement>([]);

  pageLimitOptions: Array<number> = [2, 5, 10, 15, 20, 100];

  filterPaginator: FilterPaginator = {};

  @ViewChild(MatPaginator) paginatorPageSize: MatPaginator;

  displayedColumns: string[] = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplay: string[] = ['name', 'weight', 'symbol', 'position'];

  columnsToHeaders: string[] = ['nome', 'weight', 'symbol', 'position'];


  captionColumns: fieldsProperties[] = [
    { caption: 'Nome', weight: 50, mask: '', align: 'center', name: 'name' },
    { caption: 'Weight', weight: 10, mask: '', align: 'center', name: 'weight' },
    { caption: 'symbol', weight: 10, mask: '', align: 'center', name: 'symbol' },
    { caption: 'Posição', weight: 30, mask: '', align: 'center', name: 'position' }
  ]
    



  data: PeriodicElement[] = ELEMENT_DATA;


  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private fb: UntypedFormBuilder,
    private arquivoService: ArquivosService

  ) { }

  filtrosForm: UntypedFormGroup;

  eCliente = true;

  number = 47;
  numbers = [41, 42, 47, 48]


  mNovoValor = 42;
  nrSelect = 47;
  options = [41, 42, 47, 48];
  mQtdDec = 3;
  mSepMilhar = ".";
  mSepDecimal = ",";




  ngOnInit(): void {
    this.dataSourceWithPageSize.data = this.data;
    this.filterPaginator.page = 0;
    this.filterPaginator.size = 5;
    this.filterPaginator.totalElements = 0;
    this.filterPaginator.totalPages = 0;
//    this.dataSource.paginator = this.paginator;
    this.addForm();
  }


  setarNovoValor() {

    this.nrSelect = this.mNovoValor;
    this.number = this.mNovoValor;
  }


  addForm() {
    this.filtrosForm = this.fb.group({
      idProjeto: this.fb.control(new String()),
      idProjetoInibir: false,
      tipoPesquisa: new UntypedFormControl(''),
      tipoCondicao: new UntypedFormControl(''),
      nomeDoCampo: new UntypedFormControl(''),
      condicao: new UntypedFormControl(''),
      valorCampo: new UntypedFormControl(''),
      valorString: new UntypedFormControl(0.000),
      ordem: new UntypedFormControl(''),
      tipoRelatorio: new UntypedFormControl('pdf'),
      separadoPor: new UntypedFormControl('Sem Separar'),
      irParaPagina: new UntypedFormControl(0),
      datHorIncIni: new UntypedFormControl(new Date()),
      datHorIncFin: new UntypedFormControl(new Date()),

      camposParaFiltrosModel: this.fb.array([
        this.fb.group({
          id: [' '],
          name: [' '],
          tipoCampo: [' '],
          idInterno: [' ']
        })
      ]),
      filtrosCustomizados: this.fb.array([
        this.fb.group({
          tipoCondicao: [' '],
          nomeDoCampo: [' '],
          condicao: [' '],
          valorString: [' '],
        })
      ]),
    });
  }

  getFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles() {




    const frmData = new FormData();


    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append("files", this.myFiles[i]);


    }

    frmData.append('pIdPessoa', '0');
    frmData.append('data', '[]');
    frmData.append('dataExcluidos', '[]');


    // inicio 


    let pathUplod: string = 'cadpessoas/files';
    this.arquivoService.uploadFiles(frmData, pathUplod).subscribe(
      (res) => {
      },
      (err) => {
      },
      () => {


      }
    )

    // termino


  }


  addColumn() {
    const randomColumn = Math.floor(
      Math.random() * this.displayedColumns.length
    );
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  

  removeColumn() {
    if (this.columnsToDisplay.length) {
//      this.columnsToDisplay.pop();
      this.columnsToDisplay.splice(2,1);
    }
  }

  shuffle() {
    let currentIndex = this.columnsToDisplay.length;
    while (0 !== currentIndex) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap
      let temp = this.columnsToDisplay[currentIndex];
      this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
      this.columnsToDisplay[randomIndex] = temp;
    }
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


  fValorENomeDoCampoParaformatar(pValor: PeriodicElement, pNomeCampo: string) {



    let mValor: String = "";
    mValor = pValor[pNomeCampo];
    let mIndex = this.captionColumns.findIndex(x => x.name === pNomeCampo);
    if (mIndex > -1) {

      let mTipoCampo: String = this.captionColumns[mIndex].mask;


      return this.fRetornaFormatado(mValor, mTipoCampo);
    }

  }

  fRetornaFormatado(pValor: any, pDataMask: String) {
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



  changeEvent() {
    this.filterPaginator.page = this.paginatorPageSize.pageIndex;
    this.filterPaginator.size = this.paginatorPageSize.pageSize;

  }


}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];


