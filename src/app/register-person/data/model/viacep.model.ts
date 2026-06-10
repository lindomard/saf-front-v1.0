export interface ViaCep {
    cep?: string;
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
    unidade?: string;
    ibge?: string;
    gia?: string;
    cidadeResponse: CidadeResponse;
}


export interface CidadeResponse {
  id?: number;
  nome?: string;
  estado?: string;
  ibge?: string;
  codigoPais?: string;
  codigoPrefeitura?: string;
  pais?: string;
}



export interface ViaCepModel {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  unidade?: string;
  ibge?: string;
  gia?: string;
}


