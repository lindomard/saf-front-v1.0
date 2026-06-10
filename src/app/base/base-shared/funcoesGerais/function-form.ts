import { safeCall, safeCallOrNull } from "@base-core/safe-call";
import { FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { ItemTable } from '@base-shared/table-list-genesis/table-list-genesis.component';

export function getFormBuildIndex(name: string, fields: FormBuildConfig[]): number {
  const list = fields;
  const item = list.find(o => o.name != undefined && o.name === name);
  return list.indexOf(item);
}

export function getFormGroupIndex(name: string, fields: FormBuildConfig[]): number {
  const list = fields;
  const item = list.find(o => o.name != undefined && o.name === name);
  return list.indexOf(item);
}

export function getItemTableIndex(name: string, fields: ItemTable[]): number {
  const list = fields;
  const item = list.find(o => o.columnName != undefined && o.columnName === name);
  return list.indexOf(item);
}



// inicio

export function fExisteItemComOMesmoValor(obj: any, pNomeCampo: any, pValor: String): number {


  let mQtdExist: number = 0;




  //    var o = { "key1": "value1", "key2": "value2"};
  var o = obj;

  for (var prop in o) {
    let mExisteCampo: boolean = o[prop].hasOwnProperty(pNomeCampo);


    if (mExisteCampo) {

      if (o[prop][pNomeCampo] == pValor) {
        mQtdExist++;
      }

    }
  }

  return mQtdExist;

}


// termino 

// inicio mesmo valor array
export function fExisteItemComOMesmoValorArray(obj: any, pCampos: any[], pForm): number {



  try {

    let mQtdExist: number = 0;
    let mQtdIgual: number = 0;




    //    var o = { "key1": "value1", "key2": "value2"};
    var o = obj;

    for (var prop in o) {
      var passo;
      mQtdIgual = 0;

      for (passo = 0; passo < pCampos.length; passo++) {

        if (o[prop][pCampos[passo]] == pForm.get(pCampos[passo]).value) {
          mQtdIgual++;
        }
      }
      if (mQtdIgual == pCampos.length) {
        mQtdExist++;
      }
    }


    return mQtdExist;

  } catch (error) {
    return -1;

  }
}

// termino mesmo valor array



export function commonCase(name: string): string {
  name = name.toLowerCase();
  let mSaida: string = "";


  let mCommonCase: boolean = false;
  for (let i = 0; i < name.length; i++) {
    if (name.charAt(i) == "_") {
      mCommonCase = true;
    } else {
      mSaida += (mCommonCase === true ? name.charAt(i).toUpperCase() : name.charAt(i));
      mCommonCase = false;
    }

  }
  return mSaida;
}




export function fTestarNulo(name: string): string {


  let mRetorno: string = "";

  safeCall(name, (ret) => {
    mRetorno = ret;
  })
  return mRetorno.replace(" ", "\n");
}


export function ParseFloat(str: number, val: number) {
  return str.toFixed(val);
}


// inicio


export function HttpSuccessAntigo(param: any): string {

  let message = "";
  try {





    safeCallOrNull(param.success, (it) => {
      return it;
    },
      () => {
        // inicio

        safeCallOrNull(param.error, (it) => {
          return it;
        },
          () => {

            // inicio
            return JSON.stringify(param);

            // fim
          });

        // fim

      });



    if (param.success && param.success !== null) {
      message = param.success;
    } else if (param.error && param.error !== null) {
      message = param.error;
    } else {
      message = JSON.stringify(param);

    }
  } catch (error) {
    message = JSON.stringify(param);

  }

  return message;
}


export function HttpErrorAntigo(param: any): string {

  let message = "";
  try {

  } catch (error) {
    message = JSON.stringify(param);

  }

  return message;
}



export function HttpMensage(param: any): string {

  //  console.log('209', param)
  let message;
  try {



    // ininio
    //    console.log("errro 54 "+ JSON.stringify(param.status) );

    if (!message) {
      if (param.status == 400 || param.status == 401) {
        // inicio

        safeCallOrNull(param.error, (it) => {
          message = it.error;
        },
          () => {
            message = "Usuário ou senha invalido."
          });

        // fim



      }
    }
    /*
  switch (err.status) {
    case 400: {
      error = ('Usuário ou senha invalido.');
      break;
    }
    case 401: {
      error = ('Usuário ou senha invalido.');
      break;
    }
  */

    if (!message) {
      safeCall(param.success, (it) => {
        message = it;
      });
    }

    //    console.log('message 180 ', message);




    if (!message) {

      safeCall(param.message, (it) => {

        message = it;
      });
    }


    if (!message) {
      try {

        safeCall(param.error.message, (it) => {
          message = it;
        });
      } catch (error) {
        console.log('erro excessao ', error)

      }

    }


    //  console.log('message 189 ', message);


    if (!message) {
      try {
        safeCall(param.error.error, (it) => {
          message = it;
        });
      } catch (error) {
        console.log('erro excessao ', error)

      }

    }

    if (!message) {
      try {
        safeCall(param.HttpHeaders.message, (it) => {
          message = it;
        });
      } catch (error) {
        console.log('erro excessao ', error)

      }

    }


    if (!message) {

      try {
        safeCall(param.error, (it) => {
          message = it;
        });
      } catch (error) {
        console.log('erro excessao ', error)

      }

    }






    if (!message) {
      safeCall(param, (it) => {

        message = it;
      });
    }



    if (!message) {

      return JSON.stringify(param);
    } else {

      return message;
    }


  } catch (error) {
    message = JSON.stringify(param);

  }

  return message;

}


