import { FormGroup, UntypedFormGroup, ValidationErrors } from "@angular/forms";

export function getFormValidationErrors(formCadpessoas: FormGroup) {

    let mErros = "";
    Object.keys(formCadpessoas.controls).forEach(key => {
      formCadpessoas.get(key).getError;
      const controlErrors: ValidationErrors = formCadpessoas.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {

//          let mObs = (keyError ? "Campo " + key + " " + JSON.stringify(controlErrors[keyError])  : "");
          let mObs = (keyError ? key + " " + JSON.stringify(controlErrors[keyError])  : "");
          if (mObs.length > 0) {
            mErros += mObs.replace("true","Não pode ser Nulo")+"; ";
          }
        });
      }
    });
    return mErros;
  }


  export function validarForm(formCadpessoas: UntypedFormGroup) {

    Object.keys(formCadpessoas.controls).forEach(campo => {
      const controle = formCadpessoas.get(campo);
      controle.markAsTouched();
    })


  }
