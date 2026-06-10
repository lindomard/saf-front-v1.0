import { FiltrosGenericosModel } from "@base-core/model/filtros-genericos-model";

export class AdicionarFiltrosGenericos {

  filtrosGenericos: FiltrosGenericosModel[];
  nomeCampo: String;
  condicao: String;
  valor: String;
  grupoDados: number;
  tipoLigacao: String;
  

  constructor(filtrosGenericos: FiltrosGenericosModel[], nomeCampo: String, condicao: String, valor: String, grupoDados: number, tipoLigacao: String) {
    this.filtrosGenericos = filtrosGenericos;
    this.nomeCampo = nomeCampo;
    this.condicao = condicao;
    this.valor = valor;
    this.grupoDados = grupoDados;
    this.tipoLigacao = tipoLigacao.trim().length<1 ? " and " : tipoLigacao;

  }

  adicionarfiltros(): FiltrosGenericosModel[] {
    this.filtrosGenericos.push({ nomeDoCampo: this.nomeCampo, condicao: this.condicao, valor: this.valor, grupoDados: this.grupoDados, tipoLigacao: this.tipoLigacao
     });
    return this.filtrosGenericos;
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