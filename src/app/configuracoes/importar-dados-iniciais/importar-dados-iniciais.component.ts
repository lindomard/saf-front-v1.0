import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-importar-dados-iniciais',
  templateUrl: './importar-dados-iniciais.component.html',
  styleUrls: ['./importar-dados-iniciais.component.scss']
})
export class ImportarDadosIniciaisComponent implements OnInit {


  constructor(
    private router: Router
  ) { }

  isLoading: boolean = false;
  mTipoOperacao: string = "Importar dados Iniciais";

  ngOnInit(): void {
  }


  importarPlanilhaCfop() {
  }

  sair() {
    this.router.navigate(['/page/home']);
  }

}


