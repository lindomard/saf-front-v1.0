import { UntypedFormArray, UntypedFormGroup } from "@angular/forms";
import { FiltrosGenericosModel } from "@base-core/model/filtros-genericos-model";

export class PreencherFiltrosCustomizados {

  filtrosGenericos: FiltrosGenericosModel[];
  filtrosForm: UntypedFormGroup;

  constructor(filtrosGenericos: FiltrosGenericosModel[],filtrosForm: UntypedFormGroup ) {
    this.filtrosGenericos = filtrosGenericos;
    this.filtrosForm = filtrosForm;
  }

  fPreencherFiltrosCustomizados(): FiltrosGenericosModel[] {


    let itensArray =this.filtrosForm.controls.filtrosCustomizados as UntypedFormArray;
    let arraylen = itensArray.length;
    if (arraylen > 1) {
      var passo;
      for (passo = 0; passo < arraylen - 1; passo++) {
        const myForm = (<UntypedFormArray>this.filtrosForm.get("filtrosCustomizados")).at(passo);
        let camposParaFiltrosModelTemp = myForm.get("nomeDoCampo").value;
        let condicoesComboBoxModel = myForm.get("condicao").value;
        this.filtrosGenericos.push({
          nomeDoCampo: camposParaFiltrosModelTemp.id,
          condicao: condicoesComboBoxModel.id,
          valor: myForm.get("valorString").value
        });
      }
    }
    return this.filtrosGenericos;
  

  }


}

