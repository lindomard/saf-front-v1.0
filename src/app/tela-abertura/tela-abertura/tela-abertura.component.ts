import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-abertura',
  templateUrl: './tela-abertura.component.html',
  styleUrls: ['./tela-abertura.component.scss']
})
export class TesteTalaComponent implements OnInit {

  isLogin = true;
  readonly currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void { }

  fAtivarCadastro() {
    this.isLogin = false;
  }

  fAtivarLogin() {
    this.isLogin = true;
  }
}

