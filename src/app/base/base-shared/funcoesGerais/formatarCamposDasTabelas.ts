import * as moment from "moment";
import { FuncoesGerais } from "./funcoes";
import { ParseFloat } from "./function-form";

export class FormatarCamposDastabelas {
  
  
  pValor: any;
  pDataMask: String;
  

  constructor(pValor: any, pDataMask: String) {
    this.pValor = pValor;
    this.pDataMask = pDataMask;
  }

  formatar(): string {

    var month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    try {


      if (this.pValor == null || this.pDataMask == null) {
        return this.pValor;
      }


      let mValor: string = this.pDataMask.toLowerCase();
      switch (mValor) {
        case 'valorboolean':
          return this.pValor == 1 ? "SIM" : "NAO";

        case 'datetime':
          return moment(this.pValor).format('DD/MM/YYYY HH:mm:ss');
        case 'datetime-local':
          return moment(this.pValor).format('DD/MM/YYYY HH:mm');
        case 'date':
          return moment(this.pValor).format('DD/MM/YYYY');
        case 'cnpj':
          return FuncoesGerais.fMascaracpfCnpj(this.pValor);
        case 'valor2dec':
          return ParseFloat(FuncoesGerais.toDouble(this.pValor), 2);
        case 'valor3dec':
          return ParseFloat(FuncoesGerais.toDouble(this.pValor), 3);
        case 'valor4dec':
          return ParseFloat(FuncoesGerais.toDouble(this.pValor), 4);
        case 'anomes':
            return this.pValor.toString().substring(4,6)+"/"+this.pValor.toString().substring(0,4);
        case 'anomesext':
            return month[FuncoesGerais.toInt(this.pValor.toString().substring(4,6))-1]+"/"+this.pValor.toString().substring(0,4);
             
        default:


          return this.pValor;
      }


    } catch (error) {
      console.log("catch 59 " + error)

      return this.pValor;
    }
  }

}