
export interface DadosPessoasModel {
  atividade_principal?: atividade_principal[];
  atividades_secundarias?: atividades_secundarias[];
  qsa?: qsa[];

  data_situacao?: string;
  complemento?: string;
  nome?: string;
  uf?: string;
  telefone?: string;

  situacao?: string;
  bairro?: string;
  logradouro?: string;
  numero?: string;
  cep?: string;
  municipio?: string;
  codmunIbge?: string;
  codmunPrefeitura?: string;
  abertura?: string;
  natureza_juridica?: string;
  cnpj?: string;
  ie?: string;
  ultima_atualizacao?: string;
  status?: string;
  tipo?: string;
  fantasia?: string;
  email?: string;
  efr?: string;
  motivo_situacao?: string;
  situacao_especial?: string;
  data_situacao_especial?: string;
  capital_social?: string;
  

}


export interface atividade_principal {
  text?: string;
  code?: string;
}

export interface atividades_secundarias {
  text?: string;
  code?: string;
}

export interface qsa {
  qual?: string;
  nome?: string;
}




