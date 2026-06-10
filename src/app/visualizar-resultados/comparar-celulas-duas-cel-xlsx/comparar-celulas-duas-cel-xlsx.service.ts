import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { Observable } from 'rxjs';
import { Page } from '@base-core/model/page.model';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { DadosParaComboboxModel } from '@base-core/model/dados-para-combobox-model';
import { Response } from '@base-core/model/response.model';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { CadprocExecModel } from '../model/CadprocExecModel';

@Injectable({
  providedIn: 'root'
})
export class CompararCelulasDuasCelXlsxService {

  constructor(private api: ApiCreateHttpclienteService) { }


     
}
