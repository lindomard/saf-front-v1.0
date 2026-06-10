import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { CadprocExecModel } from './model/CadprocExecModel';
import { Observable } from 'rxjs';
import { Page } from '@base-core/model/page.model';
import { Cadr0200ZeroEsquerdaModel } from './model/Cadr0200ZeroEsquerdaModel';
import { ParametrosDados } from '../dados-comuns/model/CamposParaFiltros';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { DadosParaComboboxModel } from '@base-core/model/dados-para-combobox-model';
import { Response } from '@base-core/model/response.model';
import { CadreltabCabModel } from '../genericos/model/CadrelpadCabModel';

@Injectable({
  providedIn: 'root'
})
export class VisualizarResultadosService {

  constructor(private api: ApiCreateHttpclienteService) { }


  BuscarResultadosPage(parametrosDados:  ParametrosDados, filterPaginator: FilterPaginator):
   Observable<Page<CadprocExecModel>> {
    let url = "cadprocExecVisualizacaoGetPage?size="+filterPaginator.size+"&page="+filterPaginator.page;
    return this.api.post<Page<CadprocExecModel>>(url, parametrosDados);
    }

    

    BuscarCadr0200ZeroEsquerdaPage(parametrosDados: ParametrosDados, filterPaginator: FilterPaginator): Observable<Page<Cadr0200ZeroEsquerdaModel>> {

  
      let url = "cadr0200ZeroEsquerdaGetPage?size="+filterPaginator.size+"&page="+filterPaginator.page;

      return this.api.post<Page<Cadr0200ZeroEsquerdaModel>>(url, parametrosDados);
     }
 
     BuscarResultadosPlanilhas(parametrosDados:  ParametrosDados): Observable<NomeDoArquivoGeradoModel[]> {



      let url = "visualizarPlanilha";

      return this.api.post<NomeDoArquivoGeradoModel[]>(url, parametrosDados);
     }

     BuscarRelatorios(parametrosDados:  ParametrosDados): Observable<NomeDoArquivoGeradoModel[]> {

      let url = "cadprocexecRelatorio";

      return this.api.post<NomeDoArquivoGeradoModel[]>(url, parametrosDados);
     }
     

     

     salvarTabelasPadrao(cadrelpadCabModel:  CadreltabCabModel): Observable<Response> {

      let url = "cadrelpadCabSaveUpdate";
      return this.api.put(url,  cadrelpadCabModel);
      
     }
     

     buscarTabelasPadrao(parametrosDados:  ParametrosDados): Observable<DadosParaComboboxModel[]> {

      let url = "cadrelpadCabGetListParaCombobox";
      return this.api.post<DadosParaComboboxModel[]>(url, parametrosDados);
      
     }

     

// inicio
     buscarCadTableFilPad(parametrosDados:  ParametrosDados): Observable<Response> {

      let url = "cadprocexecGetTableFieldsList";
      return this.api.post<Response>(url, parametrosDados);
      
     }
     


     
}
