import { FiltrosGenericosModel } from "@base-core/model/filtros-genericos-model";

export class VerificaFiltrosVazio {

  filtrosGenericos: FiltrosGenericosModel[];
  nomeCampo: string = "";
  condicao: string = "";
  valor: string = "";


  constructor(filtrosGenericos: FiltrosGenericosModel[]) {
    this.filtrosGenericos = filtrosGenericos;
  }

  fVerificaFiltrosVazio(): FiltrosGenericosModel[] {
    if (this.filtrosGenericos.length < 1) {
      this.filtrosGenericos.push({ nomeDoCampo: this.nomeCampo, condicao: this.condicao, valor: this.valor });
    }
    return this.filtrosGenericos;
  }


}