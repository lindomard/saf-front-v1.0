import { FormGroup, UntypedFormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { safeCall } from "@base-core/safe-call";
import { DATE_TIME_FORMAT, converterDateToString } from "@base-core/state/converter-date";
import { CadTableFilpadCamposModel } from "src/app/genericos/model/CadTableFilpadCamposModel";
import { CadTableFilpadCabModel } from "src/app/genericos/model/CadTableFilpadCabModel";
import { CadrelpadCamposModel } from "src/app/genericos/model/CadrelpadCamposModel";
import { CadreltabCabModel } from "src/app/genericos/model/CadrelpadCabModel";




export function cadreltabMapper() {
    return new CadreltabMapper();
}
export class CadreltabMapper {



    converterCadTableCamposModelToModel(CadTableFilpadCamposModelLista: CadTableFilpadCamposModel[]): CadTableFilpadCamposModel[] {
        
        return CadTableFilpadCamposModelLista.map(campos => {
            return {
      
      
      
              tfpcOrdemRelResult: campos.tfpcOrdemRelResult,
              tfpcOrdemRelResultDesc: campos.tfpcOrdemRelResultDesc,
              tfpcTamanho: campos.tfpcTamanho,
              tfpcQtddec: campos.tfpcQtddec,
              tfpcTipoCampo: campos.tfpcTipoCampo,
              tfpcOrdemResConsDesc: campos.tfpcOrdemResConsDesc,
              tfpcOrdemLista: campos.tfpcOrdemLista,
              tfpcMask: campos.tfpcMask,
              tfpcId: campos.tfpcId,
              tfpcIdCab: campos.tfpcIdCab,
              tfpcOrdemResCons: campos.tfpcOrdemResCons,
              tfpcOrdemRel: campos.tfpcOrdemRel,
              tfpcTamanhoPercFixo: campos.tfpcTamanhoPercFixo,
              tfpcAlign: campos.tfpcAlign,
              tfpcOrdemPesqpor: campos.tfpcOrdemPesqpor,
              tfpcDescricaoCustom: campos.tfpcDescricaoCustom,
              tfpcDescricaoOri: campos.tfpcDescricaoOri,
              tfpcTamanhoPerc: campos.tfpcTamanhoPerc,
              tfpcNomeCampo: campos.tfpcNomeCampo,
              tfpcOrdem: campos.tfpcOrdem,
              selecionado: campos.selecionado == undefined ? false : campos.selecionado
      
            }
          });

    }

// inicio

converterCabTableModelToModelLista(CadTableFilpadCabModelLista: CadTableFilpadCabModel[]): CadTableFilpadCabModel[] {
        
  return CadTableFilpadCabModelLista.map(campos => {
      return {


        tfpcId: campos.tfpcId, 
        tfpcCodusrUeve: campos.tfpcCodusrUeve, 
        tfpcIdPessoa: campos.tfpcIdPessoa, 
        tfpcForm: campos.tfpcForm, 
        tfpcIdUsr: campos.tfpcIdUsr, 
        tfpcNome: campos.tfpcNome, 
        tfpcDathorInc: campos.tfpcDathorInc, 
        tfpcOrigemUeve: campos.tfpcOrigemUeve, 
        tfpcDathorUeve: campos.tfpcDathorUeve, 
        tfpcOrigemInc: campos.tfpcOrigemInc, 
        tfpcCodusrInc: campos.tfpcCodusrInc,
        cadTableFilpadCampos: this.converterCadTableCamposModelToModel(campos.cadTableFilpadCampos)
      }
    });

}

converterCabTableModelToModel(cadTableFilpadCabModel: CadTableFilpadCabModel): CadTableFilpadCabModel {

  let cadTableFilpadCabModelNew: CadTableFilpadCabModel = {};


  cadTableFilpadCabModelNew.tfpcId = cadTableFilpadCabModel.tfpcId, 
  cadTableFilpadCabModelNew.tfpcCodusrUeve = cadTableFilpadCabModel.tfpcCodusrUeve, 
  cadTableFilpadCabModelNew.tfpcIdPessoa = cadTableFilpadCabModel.tfpcIdPessoa, 
  cadTableFilpadCabModelNew.tfpcForm = cadTableFilpadCabModel.tfpcForm, 
  cadTableFilpadCabModelNew.tfpcIdUsr = cadTableFilpadCabModel.tfpcIdUsr, 
  cadTableFilpadCabModelNew.tfpcNome = cadTableFilpadCabModel.tfpcNome, 
  cadTableFilpadCabModelNew.tfpcDathorInc = cadTableFilpadCabModel.tfpcDathorInc, 
  cadTableFilpadCabModelNew.tfpcOrigemUeve = cadTableFilpadCabModel.tfpcOrigemUeve, 
  cadTableFilpadCabModelNew.tfpcDathorUeve = cadTableFilpadCabModel.tfpcDathorUeve, 
  cadTableFilpadCabModelNew.tfpcOrigemInc = cadTableFilpadCabModel.tfpcOrigemInc, 
  cadTableFilpadCabModelNew.tfpcCodusrInc = cadTableFilpadCabModel.tfpcCodusrInc,
  cadTableFilpadCabModelNew.cadTableFilpadCampos = this.converterCadTableCamposModelToModel(cadTableFilpadCabModel.cadTableFilpadCampos)

  return cadTableFilpadCabModelNew;

}


// inicio

converterCadreltabnModelToModelLista(CadreltabCabModelLista: CadreltabCabModel[]): CadreltabCabModel[] {
        
  return CadreltabCabModelLista.map(campos => {
      return {


        tfpcId: campos.tfpcId, 
        tfpcIdUsr: campos.tfpcIdUsr, 
        tfpcForm: campos.tfpcForm, 
        tfpcIdPessoa: campos.tfpcIdPessoa, 
        tfpcNome: campos.tfpcNome, 
        tfpcDathorInc: campos.tfpcDathorInc, 
        tfpcCodusrInc: campos.tfpcCodusrInc, 
        tfpcDathorUeve: campos.tfpcDathorUeve, 
        tfpcCodusrUeve: campos.tfpcCodusrUeve,
        cadrelpadCamposModelLista: this.converterCadrelpadCamposModelToModel(campos.cadrelpadCamposModelLista),
      }
    });

}

// termino


converterCadReltabModelToModel(cadreltabCabModel: CadreltabCabModel): CadreltabCabModel {
        
  let cadreltabCabModelNew: CadreltabCabModel = {};


  cadreltabCabModelNew.tfpcId = cadreltabCabModel.tfpcId;
  cadreltabCabModelNew.tfpcIdUsr = cadreltabCabModel.tfpcIdUsr; 
  cadreltabCabModelNew.tfpcForm = cadreltabCabModel.tfpcForm;
  cadreltabCabModelNew.tfpcIdPessoa = cadreltabCabModel.tfpcIdPessoa;
  cadreltabCabModelNew.tfpcNome = cadreltabCabModel.tfpcNome; 
  cadreltabCabModelNew.tfpcDathorInc = cadreltabCabModel.tfpcDathorInc;
  cadreltabCabModelNew.tfpcCodusrInc = cadreltabCabModel.tfpcCodusrInc; 
  cadreltabCabModelNew.tfpcDathorUeve = cadreltabCabModel.tfpcDathorUeve;
  cadreltabCabModelNew.tfpcCodusrUeve = cadreltabCabModel.tfpcCodusrUeve;
  cadreltabCabModelNew.cadrelpadCamposModelLista = this.converterCadrelpadCamposModelToModel(cadreltabCabModel.cadrelpadCamposModelLista);
  
  return cadreltabCabModelNew;
}


converterCadrelpadCamposModelToModel(CadreltabCabModelLista: CadrelpadCamposModel[]): CadrelpadCamposModel[] {
        
  return CadreltabCabModelLista.map(campos => {
      return {

        tfpcId :campos.tfpcId, 
        tfpcAlign:campos.tfpcAlign, 
        tfpcIdCab:campos.tfpcIdCab, 
        tfpcOrdem:campos.tfpcOrdem, 
        tfpcNomeCampo:campos.tfpcNomeCampo, 
        tfpcDescricaoCustom:campos.tfpcDescricaoCustom, 
        tfpcDescricaoOri:campos.tfpcDescricaoOri, 
        tfpcOrdemLista:campos.tfpcOrdemLista, 
        tfpcOrdemPesqpor:campos.tfpcOrdemPesqpor, 
        tfpcOrdemRel:campos.tfpcOrdemRel, 
        tfpcOrdemRelResult:campos.tfpcOrdemRelResult, 
        tfpcOrdemRelResultDesc:campos.tfpcOrdemRelResultDesc, 
        tfpcOrdemResCons:campos.tfpcOrdemResCons, 
        tfpcOrdemResConsDesc:campos.tfpcOrdemResConsDesc, 
        tfpcMask:campos.tfpcMask, 
        tfpcQtddec:campos.tfpcQtddec, 
        tfpcTamanho:campos.tfpcTamanho, 
        tfpctamanhoPerc:campos.tfpctamanhoPerc, 
        tfpctamanhoPercFixo:campos.tfpctamanhoPercFixo, 
        tfpcTipoCampo:campos.tfpcTipoCampo,
        selecionado:campos.selecionado

      }
    });

}

// termino


// termino

/*


converterCadrelpadFiltrarModelToModel(CadreltabCabModelLista: CadrelpadFiltrarModel[]): CadrelpadFiltrarModel[] {
        
  return CadreltabCabModelLista.map(campos => {
      return {

        rpfId: campos.rpfId, 
        rpfEOuOr: campos.rpfEOuOr, 
        rpfValor: campos.rpfValor, 
        rpfNomeCampo: campos.rpfNomeCampo, 
        rpfCondicao: campos.rpfCondicao, 
        rpfOrdem: campos.rpfOrdem,
        rpfGrupo: campos.rpfGrupo, 
    

      }
    });

}
*/
// termino


}