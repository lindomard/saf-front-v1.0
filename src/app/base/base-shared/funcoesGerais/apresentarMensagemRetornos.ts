import { FiltrosGenericosModel } from "@base-core/model/filtros-genericos-model";
import { Response } from "@base-core/model/response.model";
import { SnotifyService } from "ng-snotify";

export class ApresentarMensagemRetornos {

  response: Response;
  

  constructor(private snotifyService: SnotifyService,
    response: Response) {
    this.response = response;
    
  }

  apresentarMensagem() {
    if (this.response.success) {
      this.snotifyService.info(this.response.success)
    } else {this.snotifyService.error(this.response.error)};
  }

  /*
  fVerificaFiltrosVazio(): FiltrosGenericosModel[] {
    if (this.filtrosGenericos.length < 1) {
      this.filtrosGenericos.push({ nomeDoCampo: "", condicao: "", valor: "" });
    }
    return this.filtrosGenericos;
  }
*/

}