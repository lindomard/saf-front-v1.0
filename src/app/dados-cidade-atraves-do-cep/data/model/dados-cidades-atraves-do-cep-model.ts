export interface DadosCidadesAtravesDoCepModel {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  unidade?: string;
  ibge?: string;
  gia?: string;
  cidadeResponse: CidadeResponseModel;
}


export interface CidadeResponseModel {
id?: number;
nome?: string;
estado?: string;
ibge?: string;
codigoPais?: string;
codigoPrefeitura?: string;
pais?: string;
}



