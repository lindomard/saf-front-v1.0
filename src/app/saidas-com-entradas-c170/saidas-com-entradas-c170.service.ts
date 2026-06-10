import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { ParametrosDados } from '../dados-comuns/model/CamposParaFiltros';
import { Observable } from 'rxjs';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { Response } from '@base-core/model/response.model';
import { CadreltabCabModel } from '../genericos/model/CadrelpadCabModel';

@Injectable({
  providedIn: 'root'
})
export class SaidasComEntradasC170Service {

constructor(private api: ApiCreateHttpclienteService) { }


BuscarResultadosPage(parametrosDados:  ParametrosDados):
 Observable<Response> {
  let url = "cadrc170GetEntradasComSaidas";
  return this.api.post<Response>(url, parametrosDados);
  }

  

   BuscarResultadosPlanilhas(parametrosDados:  ParametrosDados): Observable<NomeDoArquivoGeradoModel[]> {

    let url = "cadrc170PlanilhaEntradasComSaidas";

    return this.api.post<NomeDoArquivoGeradoModel[]>(url, parametrosDados);
   }

   BuscarRelatorios(parametrosDados:  ParametrosDados): Observable<NomeDoArquivoGeradoModel[]> {

    let url = "cadrc170PlanilhaEntradasComSaidas";

    return this.api.post<NomeDoArquivoGeradoModel[]>(url, parametrosDados);
   }
   
 


   salvarTabelasPadrao(cadrelpadCabModel:  CadreltabCabModel): Observable<Response> {

    let url = "cadrelpadCabSaveUpdate";
    return this.api.put(url,  cadrelpadCabModel);
    
   }
   
   /*

   buscarTabelasPadrao(parametrosDados:  ParametrosDados): Observable<DadosParaComboboxModel[]> {

    let url = "cadrelpadCabGetListParaCombobox";
    return this.api.post<DadosParaComboboxModel[]>(url, parametrosDados);
    
   }

   
   buscarRelatorioPadrao(parametrosDados:  ParametrosDados): Observable<CadrelpadCabModel[]> {

    let url = "cadrelpadCabGetList";
    return this.api.post<CadrelpadCabModel[]>(url, parametrosDados);
    
   }
   */

// inicio
   buscarGetTableFieldsList(parametrosDados:  ParametrosDados): Observable<Response> {

    let url = "cadrc170SaidasComEntradasGetTableFieldsList";
    return this.api.post<Response>(url, parametrosDados);
   
   }



}
