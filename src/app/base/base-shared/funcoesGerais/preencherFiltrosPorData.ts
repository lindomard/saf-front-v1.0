import { FormGroup } from "@angular/forms";
import { FiltrosGenericosModel } from "@base-core/model/filtros-genericos-model";
import { safeCall } from "@base-core/safe-call";

export class PreencherFiltrosPorData {

  filtrosGenericos: FiltrosGenericosModel[];
  filtrosForm: FormGroup;
  mCamposParaPesquisa: string;

  constructor(filtrosGenericos: FiltrosGenericosModel[],filtrosForm: FormGroup, pCamposParaPesquisa: string ) {
    this.filtrosGenericos = filtrosGenericos;
    this.filtrosForm = filtrosForm;
    this.mCamposParaPesquisa = pCamposParaPesquisa;
  }

  fPreencherFiltrosPorData(): FiltrosGenericosModel[] {



// inicio 


  safeCall(this.mCamposParaPesquisa, (it) => {
    safeCall(this.filtrosForm.get("datHorIncIni"), (it2) => {
      let condicao = ">=";
      let valor = this.filtrosForm.get("datHorIncIni").value;
      this.filtrosGenericos.push({
        nomeDoCampo: this.mCamposParaPesquisa,
        condicao: condicao,
        valor: valor
      });
    });
    safeCall(this.filtrosForm.get("datHorIncFin"), (it2) => {
      let condicao = "<=";
      let valor = this.filtrosForm.get("datHorIncFin").value;
      this.filtrosGenericos.push({
        nomeDoCampo: this.mCamposParaPesquisa,
        condicao: condicao,
        valor: valor
      });
    });
  });
  return this.filtrosGenericos;

}

// termino




}

