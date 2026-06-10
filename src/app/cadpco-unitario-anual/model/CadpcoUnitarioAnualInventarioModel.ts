import { Cadr0200UnicoResumidoModel } from "src/app/retaguarda-visualizar-resultados/model/Cadr0200UnicoResumidoModel"

export interface CadpcoUnitarioAnualInventarioModel {
    chaveId?: number,
    codItem?: String,
    ipIdPessoa?: number,
    ipSaldoInicial?: number,
    ipValorTotalInicial?: number,
    ipPrecoUnitInicial?: number,
    ipSaldoFinal?: number,
    ipValorTotalFinal?: number,
    ipPrecoUnitFinal?: number,
    cadr0200UnicoResumido?: Cadr0200UnicoResumidoModel

}