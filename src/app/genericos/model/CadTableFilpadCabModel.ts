import { CadTableFilpadCamposModel } from "./CadTableFilpadCamposModel";
import { CadrelpadCabResumido } from "./CadrelpadCabResumido";

export interface CadTableFilpadCabModel {
    tfpcId?: number, 
    tfpcCodusrUeve?: number, 
    tfpcIdPessoa?: number, 
    tfpcForm?: string, 
    tfpcIdUsr?: number, 
    tfpcNome?: string, 
    tfpcDathorInc?: string, 
    tfpcOrigemUeve?: string, 
    tfpcDathorUeve?: string, 
    tfpcOrigemInc?: string, 
    tfpcCodusrInc?: number,
    tfpcRelPaisagem?: number,
    cadTableFilpadCampos?: CadTableFilpadCamposModel[],
    cadrelpadCabResumido?: CadrelpadCabResumido[]

}
    