export class ServicosDisponiveis {

    csId: number;
    csNomeservico: string;
    check: boolean;
    cpIdServ: number;
  
    constructor(
      csId: number, csNomeservico,  check, cpIdServ) {
      this.csId = csId;
      this. csNomeservico =  csNomeservico;
      this.check = check;
      this.cpIdServ = cpIdServ;
    }
  
  }
  
  
  export class ListaServicosDisponiveis {
    servicosDisponiveis = new  Array<ServicosDisponiveis>();
  
  }
  